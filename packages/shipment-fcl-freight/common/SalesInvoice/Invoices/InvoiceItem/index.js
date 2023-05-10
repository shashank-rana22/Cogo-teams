import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import Item from './Item';
import styles from './styles.module.css';

function InvoiceItem({
	item = {},
	total,
	refetch = () => {},
	loading = false,
	shipment_data = {},
	invoiceData = {},
	invoicesList = [],
	isIRNGenerated = false,
	org_outstanding,
	salesInvoicesRefetch = () => {},
	refetchCN = () => {},
}) {
	const { total_price_discounted, total_price_currency } = total || {};
	const { total_outstanding_amount, currency } = org_outstanding || {};

	const outStanding = formatAmount({
		amount  : total_outstanding_amount || 0,
		currency,
		options : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});

	return (
		<main className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.InvoicePartyDetails}>
					<div className={styles.InvoicingPartyName}>
						{item?.name || item?.business_name || 'VOLTAS LIMITED'}
					</div>
					<div className={styles.label}>Invoicing Party</div>
				</div>

				<div className={styles.InvoiceValueContainer} style={org_outstanding}>
					<div className={styles.InvoiceValueTitle}>
						Invoice Value -
					</div>

					<div className={styles.InvoiceValue}>
						{formatAmount({
							amount   : total_price_discounted,
							currency : total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
				</div>

				{org_outstanding ? (
					<div className={styles.InvoiceValueContainer} style={{ marginLeft: '2.5%' }}>
						<div className={styles.InvoiceValueTitle}>
							Total Outstanding -
						</div>

						<div className={styles.InvoiceValue}>{outStanding}</div>
					</div>
				) : null}
			</div>

			{/* {(item?.invoices || []).map((invoice) => ( */}
			<Item
				// invoice={invoice}
				refetch={refetch}
				loading={loading}
				shipment_data={shipment_data}
				invoiceData={invoiceData}
				invoicesList={invoicesList}
				isIRNGenerated={isIRNGenerated}
				salesInvoicesRefetch={salesInvoicesRefetch}
				refetchCN={refetchCN}
			/>
			{/* ))} */}
		</main>
	);
}

export default InvoiceItem;
