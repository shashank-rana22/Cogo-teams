import { List } from '@cogoport/air-modules';
import { Tooltip, Button, ButtonIcon, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen, IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useListShipmentDocuments from '../../../../../hooks/useListShipmentDocuments';
import useUpdateTask from '../../../../../hooks/useUpdateTask';

import { uploadLeoFields } from './configs/upload-leo-fields';
import styles from './styles.module.css';
import UploadLeoDocument from './UploadLeoDocument';

function UploadLeo({ shipmentData = {}, task = {}, refetch = () => {}, onCancel = () => {} }) {
	const { fields = [] } = uploadLeoFields();

	const [invoiceData, setInvoiceData] = useState([]);
	const [uploadLeoModal, setUploadLeoModal] = useState({});

	const DEFAULT_FILTERS = {
		document_type : 'checklist',
		shipment_id   : shipmentData?.id,
	};

	const { data = {}, loading = false } = useListShipmentDocuments({ defaultFilters: DEFAULT_FILTERS });

	const { loading:updateLoading, apiTrigger } = useUpdateTask({ refetch });

	const handleClickOnDownload = (documentUrl) => {
		if (typeof window !== 'undefined') {
			window.open(documentUrl, '_blank');
		}
	};

	const functions = {
		handleShippingBillNo: (singleItem) => {
			const itemData = JSON.parse(singleItem?.data) || {};
			return (
				<div>{itemData?.data?.shipping_bill_number}</div>
			);
		},
		handleUploadDate: (singleItem) => {
			const { uploaded_at } = singleItem || {};
			return (
				<>
					{formatDate({
						date       : uploaded_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</>
			);
		},
		handleViewDoc: (singleItem) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => handleClickOnDownload(singleItem?.document_url)}
			>
				<div className={styles.tooltip_container}>
					<Tooltip
						content="Preview Document"
						placement="right"
						interactive
					>
						<IcMEyeopen fill="var(--color-accent-orange-2)" />
					</Tooltip>
				</div>
			</Button>
		),
		handleUploadDoc: (singleItem) => (
			<ButtonIcon
				icon={(
					<div className={styles.button_icon}>
						<IcMUpload />
						Upload Leo
					</div>
				)}
				onClick={() => setUploadLeoModal(singleItem)}
				themeType="primary"
			/>
		),
		handleUploadStatus: (singleItem) => {
			const uploadStatus = (invoiceData || []).find(
				(item) => item?.data?.id === singleItem?.id,
			);
			return (
				<div className={styles.done_status}>{!isEmpty(uploadStatus) ? 'Done' : null}</div>
			);
		},
	};

	const payload = {
		id   : task?.id,
		data : {
			documents: invoiceData,
		},
	};

	const handleFormSubmit = () => {
		if (payload?.data?.documents?.length !== data?.total_count) {
			Toast.error('Please upload all the documents');
		} else {
			apiTrigger(payload).then(() => {
				onCancel();
			});
		}
	};

	return (
		<div className={styles.container}>
			<List fields={fields} data={data} loading={loading} functions={functions} />
			<div className={styles.button_div}>

				<div style={{ margin: '0 10px 0 0' }}>
					<Button onClick={onCancel} themeType="secondary" disabled={updateLoading}>
						Cancel
					</Button>
				</div>
				<div style={{ margin: '0 16px 0 10px' }}>
					<Button onClick={() => { handleFormSubmit(); }} disabled={updateLoading}>
						Submit
					</Button>
				</div>
			</div>
			{!isEmpty(uploadLeoModal) && (
				<UploadLeoDocument
					uploadLeoModal={uploadLeoModal}
					setUploadLeoModal={setUploadLeoModal}
					setInvoiceData={setInvoiceData}
				/>
			)}
		</div>
	);
}

export default UploadLeo;
