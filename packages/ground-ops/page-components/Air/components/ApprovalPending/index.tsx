import { Button, Modal, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../commons/List';
import { ApprovalPendingFields } from '../../configurations/approval_pending_fields';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';
import HAWBList from '../HawbList';
import UploadModal from '../UploadModal';

import DownloadModal from './DownloadModal';
import styles from './styles.module.css';

function ApprovalPending({
	data, loading, page, setPage, setGenerate, setItem, setViewDoc, edit, setEdit, listAPI, activeTab,
}) {
	const { fields } = ApprovalPendingFields;
	const [showApprove, setShowApprove] = useState(null);
	const [show, setShow] = useState(false);
	const [showUpload, setShowUpload] = useState(null);

	const { loading:updateLoading, updateDocument } = useUpdateShipmentDocument();

	const handleDownloadMAWB = (singleItem) => {
		setViewDoc(true);
		setItem(singleItem);
	};

	const handleEditMAWB = (singleItem, action) => {
		setEdit(action || true);
		setGenerate(true);
		setItem(singleItem);
	};

	const handleClickOnDownload = (documentUrl) => {
		if (typeof window !== 'undefined') {
			window.open(documentUrl, '_blank');
		}
	};

	const handleOnEdit = (singleItem) => {
		if (singleItem?.documentState === 'document_amendment_requested') {
			handleEditMAWB(singleItem, '');
		} else if (singleItem?.documentData?.status === 'uploaded') {
			setShowUpload(singleItem); setEdit('edit');
		} else if (singleItem?.documentData?.status === 'generated') {
			handleEditMAWB(singleItem, 'edit');
		}
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
			`Draft_Airway_Bill_For_Shipment_${serialId}_${new Date().getTime()}`
			|| undefined,
		};
		await updateDocument(payload, listAPI);
		setShowApprove(null);
	};

	const functions = {
		handleDownload: (singleItem) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={singleItem?.documentData?.status === 'uploaded'
					? () => { handleClickOnDownload(singleItem.documentUrl); }
					: () => { handleDownloadMAWB(singleItem); }}
			>
				<IcMEyeopen fill="#8B8B8B" />

			</Button>
		),
		handleEdit: (singleItem) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => { handleOnEdit(singleItem); }}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		),
		handleStatus: (singleItem) => (
			singleItem.documentState === 'document_amendment_requested'
				? (
					<Tooltip
						content={singleItem?.remarks?.toString()}
						placement="top"
					>
						<div className={styles.tooltip}>
							<Button
								themeType="secondary"
								style={{ border: '1px solid #ED3726', color: '#ED3726' }}
								disabled={updateLoading}
								onClick={() => { handleEditMAWB(singleItem, ''); }}
							>
								Amend
							</Button>
						</div>
					</Tooltip>
				) : (
					<Button
						themeType="secondary"
						style={{ border: '1px solid #333' }}
						disabled={updateLoading}
						onClick={() => { setShowApprove(singleItem); }}
					>
						Approve
					</Button>
				)
		),
	};
	return (
		<>
			<List
				fields={fields}
				data={data}
				loading={loading}
				page={page}
				setPage={setPage}
				functions={functions}
				activeTab={activeTab}
				Child={HAWBList}
				setViewDoc={setViewDoc}
				setItem={setItem}
			/>
			{show && <DownloadModal show={show} setShow={setShow} />}
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
			<UploadModal
				showUpload={showUpload}
				setShowUpload={setShowUpload}
				edit={edit}
				setEdit={setEdit}
				listAPI={listAPI}
			/>
		</>
	);
}

export default ApprovalPending;
