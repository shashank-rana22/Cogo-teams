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
	isCrossEntity = false,
	creditNoteList = [],
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
				isCrossEntity={isCrossEntity}
				creditNoteList={creditNoteList}
			>
				<div className={styles.invoice_info}>
					{(invoice?.services || []).map((item) => (
						<InvoiceServiceWise
							item={item}
							loading={loading}
							key={item?.service_id}
						/>
					))}
				</div>
			</Header>
		</div>
	);
}

export default ItemHeader;
