import { List } from '@cogoport/air-modules';
import { Tooltip, Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListShipmentDocuments from '../../../../../hooks/useListShipmentDocuments';
import useUpdateShipmentSbNumbers from '../../../../../hooks/useUpdateShipmentSbNumbers';

import { uploadShippingBillFields } from './configs/upload-shipping-bill-fields';
import styles from './styles.module.css';
import UploadDocument from './UploadDocument';

function UploadShippingBill({ shipmentData = {}, task = {}, refetch = () => {}, onCancel = () => {} }) {
	const { fields = [] } = uploadShippingBillFields();

	const [invoiceData, setInvoiceData] = useState([]);

	const DEFAULT_FILTERS = {
		document_type : 'checklist',
		shipment_id   : shipmentData?.id,
	};

	const { data = {}, loading = false } = useListShipmentDocuments({
		defaultFilters : DEFAULT_FILTERS,
		defaultParams  : { page_limit: 100 },
	});

	const { loading:updateLoading, apiTrigger } = useUpdateShipmentSbNumbers({ refetch });

	const handleClickOnDownload = (documentUrl) => {
		if (typeof window !== 'undefined') {
			window.open(documentUrl, '_blank');
		}
	};

	const functions = {
		handleInvoiceNo: (singleItem) => {
			const itemData = JSON.parse(singleItem?.data) || {};
			return (
				<div>{itemData.invoice_number}</div>
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
			<UploadDocument
				singleItem={singleItem}
				invoiceData={invoiceData}
				setInvoiceData={setInvoiceData}
			/>
		),
	};

	const payload = {
		shipment_id     : shipmentData?.id,
		pending_task_id : task?.id,
		document_data   : [...invoiceData],
	};

	const handleFormSubmit = () => {
		if (payload?.document_data?.length !== data?.total_count) {
			Toast.error('Please fill all the details');
		} else {
			apiTrigger({ payload }).then(() => {
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
		</div>
	);
}

export default UploadShippingBill;
