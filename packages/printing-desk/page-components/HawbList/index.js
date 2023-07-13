import { Loader, Button, Modal } from '@cogoport/components';
import { IcMEyeopen, IcMEdit } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import { hawbFields } from '../../configurations/hawb-fields';
import CONSTANTS from '../../constants/constants';
import useGetHawbList from '../../hooks/useGetHawbList';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';

import HawbListItem from './HawbListItem';
import styles from './styles.module.css';

function HawbList({ data = {}, setViewDoc = () => {}, setItem = () => {}, setEdit = () => {} }) {
	const [showApprove, setShowApprove] = useState(null);

	const { loading:updateLoading, updateDocument } = useUpdateShipmentDocument();

	const { fields } = hawbFields;
	const { data:hawbData = {}, loading, getHawbList:listAPI } = useGetHawbList(data.shipmentId);

	const handleClickOnDownload = (documentUrl) => {
		if (typeof window !== 'undefined') {
			window.open(documentUrl, '_blank');
		}
	};

	const handleDownloadMAWB = (singleItem) => {
		setViewDoc(true);
		setItem(singleItem);
	};

	const handleEditMAWB = (singleItem, action) => {
		setEdit(action || true);
		setItem(singleItem);
	};

	const handleUpdate = async (values) => {
		const serialId = values?.serialId || '';
		const payload = {
			shipment_id         : values?.shipmentId,
			uploaded_by_org_id  : values?.serviceProviderId,
			performed_by_org_id : values?.serviceProviderId,
			document_type       : 'draft_airway_bill',
			id                  : values?.documentId,
			service_id          : values?.serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : values?.id,
			state               : 'document_accepted',
			file_name:
			`Draft_Airway_Bill_For_Shipment_${serialId}_${new Date().getTime()}`,
		};
		await updateDocument(payload, listAPI);
		setShowApprove(null);
	};

	const getControlButton = (singleItem) => {
		switch (singleItem.documentState) {
			case 'document_amendment_requested':
				return (
					<Button
						themeType="secondary"
						size="sm"
						style={{ border: '1px solid #ED3726', color: '#ED3726' }}
						disabled={updateLoading}
					>
						Amend
					</Button>
				);

			case 'document_uploaded':
				return (
					<Button
						themeType="secondary"
						size="sm"
						style={{ border: '1px solid #333' }}
						disabled={updateLoading}
						onClick={() => { setShowApprove(singleItem); }}
					>
						Approve HAWB
					</Button>
				);

			case 'document_accepted':
				return <h4>Accepted</h4>;

			default:
				return null;
		}
	};

	const functions = {
		handleSerialId: (singleItem) => (
			<div>
				#
				{singleItem.serialId || '-'}
			</div>
		),
		handleDocumentNumber: (singleItem) => (
			<p>{singleItem?.documentData?.document_number}</p>
		),
		handleDownload: (singleItem) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={singleItem?.documentData?.status === 'uploaded'
					? () => { handleClickOnDownload(singleItem.documentUrl); }
					: () => { handleDownloadMAWB(singleItem); }}
			>
				<IcMEyeopen fill="var(--color-accent-orange-2)" />
			</Button>
		),
		handleStatus: (singleItem) => (
			getControlButton(singleItem)
		),
		handleEdit: (singleItem) => (
			singleItem?.documentData?.status !== 'uploaded' && (
				<Button
					themeType="linkUi"
					style={{ fontSize: 12 }}
					onClick={() => { handleEditMAWB(singleItem, 'edit'); }}
				>
					<IcMEdit fill="var(--color-accent-orange-2)" />
				</Button>
			)
		),
	};

	useEffect(() => {
		listAPI();
	}, [listAPI]);

	return (
		<>
			<div className={styles.hawb_container}>
				{loading ? <Loader /> : (
					<div className={styles.hawb_list}>
						<header className={styles.header}>
							{fields.map((field) => (
								<div
									className={styles.col}
									style={{ '--span': field.span || CONSTANTS.DEFAULT_SPAN }}
									key={field.key}
								>
									{ field.label }
								</div>
							))}
						</header>
						{(hawbData?.data?.shipmentPendingTasks || []).map((item) => (
							<HawbListItem
								key={item.id}
								item={item}
								fields={fields}
								loading={loading}
								functions={functions}
							/>
						))}
					</div>
				)}
			</div>
			{showApprove && (
				<Modal
					size="md"
					show={showApprove}
					onClose={() => setShowApprove(false)}
					scroll={false}
				>
					<Modal.Header title={(<h4 style={{ textAlign: 'center' }}>Approval Remark</h4>)} />
					<Modal.Body>
						<div className={styles.sure_approve}>
							Did you get confirmation from your KAM to provide approval?
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							style={{ marginRight: '10px', border: '1px solid #333' }}
							size="md"
							disabled={updateLoading}
							onClick={() => setShowApprove(null)}
							themeType="secondary"
						>
							Cancel
						</Button>
						<Button
							size="md"
							themeType="accent"
							disabled={updateLoading}
							onClick={() => { handleUpdate(showApprove); }}
						>
							Approve
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
}

export default HawbList;
