import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import useGetInvoicingPartyData from '../../../../hooks/useGetInvoicingPartyData';

import InvoiceItem from './InvoiceItem';
import styles from './styles.module.css';

function EditSellQuotation({ data }) {
	const [open, setOpen] = useState(false);
	const { invoiceLoading, invoiceData, groupedInvoices, refetch } = useGetInvoicingPartyData({ data, open });
	const totals = invoiceData?.invoicing_party_wise_total;

	return (
		<>
			{open && (
				<Modal
					size="xl"
					show={open}
					onClose={() => setOpen(false)}
					interactive
					placement="center"
					className={styles.modal_body}
				>
					<Modal.Header title="Edit Sell Quotation" />
					<Modal.Body size="xl" height="80vh">
						<div className={styles.invoice_container}>
							{Object.keys(groupedInvoices || {}).map((item) => (
								<InvoiceItem
									key={item}
									item={groupedInvoices[item]}
									total={totals?.[item]}
									refetch={refetch}
									loading={invoiceLoading}
									shipment_data={data}
									invoiceData={invoiceData}
								/>
							))}
						</div>
					</Modal.Body>
				</Modal>
			)}
			<div style={{ marginRight: '10px' }}>
				<Button className="secondary lg" onClick={() => setOpen(true)}>
					Edit Sell Quotation
				</Button>
			</div>
		</>
	);
}
export default EditSellQuotation;
