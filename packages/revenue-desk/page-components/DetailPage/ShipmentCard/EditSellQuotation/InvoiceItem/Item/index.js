import React from 'react';

import Header from './Header';
import InvoiceServiceWise from './InvoiceServiceWise';
import styles from './styles.module.css';

function ItemHeader({
	invoice = {},
	refetch = () => {},
	loading = false,
	shipment_data = {},
	invoiceData = {},
}) {
	return (
		<div className={styles.container}>
			<Header
				invoice={invoice}
				refetch={refetch}
				shipment_data={shipment_data}
				invoiceData={invoiceData}
			>
				<div className={styles.invoice_info}>
					{(invoice?.services || []).map((item) => (
						<InvoiceServiceWise
							key={item}
							item={item}
							loading={loading}
							shipment_data={shipment_data}
						/>
					))}
				</div>
			</Header>
		</div>
	);
}

export default ItemHeader;
