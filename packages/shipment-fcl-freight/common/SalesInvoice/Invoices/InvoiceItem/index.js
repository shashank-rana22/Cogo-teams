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
				<div className={styles.invoice_party_details}>
					<div className={styles.invoice_party_name}>
						{item?.name || item?.business_name}
					</div>
					<div className={styles.label}>Invoicing Party</div>
				</div>

				<div className={styles.invoice_value_container} style={org_outstanding}>
					<div className={styles.invoice_value_title}>
						Invoice Value -
					</div>

					<div className={styles.invoice_value}>
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
					<div className={styles.invoice_value_container} style={{ marginLeft: '2.5%' }}>
						<div className={styles.invoice_value_title}>
							Total Outstanding -
						</div>

						<div className={styles.invoice_value}>{outStanding}</div>
					</div>
				) : null}
			</div>

			<div className={styles.invoice_list_wrapper}>

				{(item?.invoices || []).map((invoice) => (
					<Item
						key={invoice?.id}
						invoice={invoice}
						refetch={refetch}
						loading={loading}
						shipment_data={shipment_data}
						invoiceData={invoiceData}
						invoicesList={invoicesList}
						isIRNGenerated={isIRNGenerated}
						salesInvoicesRefetch={salesInvoicesRefetch}
						refetchCN={refetchCN}
					/>
				))}
			</div>
		</main>
	);
}

export default InvoiceItem;
