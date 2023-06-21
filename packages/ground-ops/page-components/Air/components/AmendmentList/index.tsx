import { Button, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen, IcMEdit } from '@cogoport/icons-react';
import React, { useState } from 'react';

import AmendmentListFields from '../../configurations/amendment-list-fields';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';
import HawbListItem from '../HawbList/HawbListItem';
import UploadModal from '../UploadModal';

import ApprovalModal from './ApprovalModal';
import styles from './styles.module.css';

const BL_CATEGORY = {
	amend_draft_airway_bill       : 'MAWB',
	amend_draft_house_airway_bill : 'HAWB',
};

function AmendmentList({ data, setViewDoc, setItem, listAPI, edit, setEdit, setGenerate }) {
	const [showUpload, setShowUpload] = useState();

	const { pendingTasks = [] } = data || {};

	const [showApprove, setShowApprove] = useState();

	const { loading:updateLoading, updateDocument } = useUpdateShipmentDocument();

	const { fields } = AmendmentListFields;

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
		setGenerate(true);
		setItem(singleItem);
	};

	const functions = {
		handleSerialId: (singleItem) => (
			<div>
				#
				{singleItem?.serialId || '-'}
			</div>
		),
		handleDocumentNumber: (singleItem) => (
			<p>{singleItem?.documentData?.document_number}</p>
		),
		handleBlCategory: (singleItem) => (
			<p>{BL_CATEGORY[singleItem?.task]}</p>
		),
		handleDeadline: (singleItem) => (
			<div>
				{formatDate({
					date       : singleItem?.deadline,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					formatType : 'dateTime',
					separator  : ', ',
				})}
			</div>
		),
		handleDownload: (singleItem) => {
			const { documentData = {} } = singleItem || {};

			const docData = { ...documentData, ...singleItem };

			return (
				<Button
					themeType="linkUi"
					style={{ fontSize: 12 }}
					onClick={singleItem?.documentData?.status === 'uploaded'
						? () => { handleClickOnDownload(singleItem?.documentUrl); }
						: () => { handleDownloadMAWB(docData); }}
				>
					<IcMEyeopen fill="#8B8B8B" />

				</Button>
			);
		},
		handleEdit: (singleItem) => {
			const { documentData = {} } = singleItem || {};

			const docData = { ...documentData, ...singleItem };

			return (
				<Button
					themeType="linkUi"
					style={{ fontSize: 12 }}
					onClick={documentData?.status === 'uploaded'
						? () => { setShowUpload(docData); setEdit(true); }
						: () => { handleEditMAWB(docData, true); }}
				>
					<IcMEdit fill="#8B8B8B" />
				</Button>
			);
		},
		handleStatus: (singleItem) => (
			<Tooltip
				content={singleItem?.remarks?.toString()}
				placement="top"
			>
				<Button
					themeType="linkUi"
					style={{ color: '#ee3425' }}
					disabled={updateLoading}
					onClick={() => { setShowApprove(singleItem); }}
				>
					{`Approve ${BL_CATEGORY[singleItem?.task]}`}
				</Button>
			</Tooltip>
		),
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
			pending_task_id     : values?.taskId,
			state               : 'document_accepted',
			file_name:
			`Draft_Airway_Bill_For_Shipment_${serialId}_${new Date().getTime()}`,
		};
		await updateDocument(payload, listAPI);
		setShowApprove(null);
	};

	return (
		<div className={styles.amendment_container}>
			<div className={styles.amendment_list}>
				<header className={styles.header}>
					{fields.map((field) => (
						<div
							className={styles.col}
							style={{ '--span': field.span || 1 } as React.CSSProperties}
							key={field.key}
						>
							{ field.label }
						</div>
					))}
				</header>
				{(pendingTasks || []).map((item) => (
					<HawbListItem
						item={item}
						fields={fields}
						loading={false}
						functions={functions}
						key={item.taskId}
					/>
				))}
			</div>
			{showApprove && (
				<ApprovalModal
					showApprove={showApprove}
					setShowApprove={setShowApprove}
					handleUpdate={handleUpdate}
					updateLoading={updateLoading}
				/>
			)}
			<UploadModal
				showUpload={showUpload}
				setShowUpload={setShowUpload}
				listAPI={listAPI}
				edit={edit}
				setEdit={setEdit}
			/>
		</div>
	);
}

export default AmendmentList;
