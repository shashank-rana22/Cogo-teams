import React from 'react';

import Header from './Header';
import InvoiceServiceWise from './InvoiceServiceWise';
import styles from './styles.module.css';

function ItemHeader({
	invoice = {},
	bfInvoiceRefetch = () => {},
	loading = false,
	invoiceData = {},
	invoicesList = [],
	isIRNGenerated = false,
	salesInvoicesRefetch = () => {},
	refetchCN = () => {},
}) {
	return (
		<div className={styles.container}>
			<Header
				invoice={invoice}
				bfInvoiceRefetch={bfInvoiceRefetch}
				invoiceData={invoiceData}
				invoicesList={invoicesList}
				isIRNGenerated={isIRNGenerated}
				salesInvoicesRefetch={salesInvoicesRefetch}
				refetchCN={refetchCN}
			>
				<div className={styles.invoice_info}>
					{(invoice?.services || []).map((item) => (
						<InvoiceServiceWise
							item={item}
							loading={loading}
							key={item}
						/>
					))}
				</div>
			</Header>
		</div>
	);
}

export default ItemHeader;
