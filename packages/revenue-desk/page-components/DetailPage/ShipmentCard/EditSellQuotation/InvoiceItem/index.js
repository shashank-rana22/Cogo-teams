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
}) {
	const { total_price_discounted, total_price_currency } = total || {};

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.invoice_party_details}>
					<div className={styles.invoice_party_name}>
						{item?.name || item?.business_name}
					</div>
					<div className={styles.label}>(Invoicing Party)</div>
				</div>

				<div className={styles.invoice_value_container}>
					<div className={styles.invoice_value_title}>Total Invoice Value -</div>

					<div className={styles.value}>
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
			</div>

			{(item?.invoices || []).map((invoice) => (
				<Item
					key={invoice}
					invoice={invoice}
					refetch={refetch}
					loading={loading}
					shipment_data={shipment_data}
					invoiceData={invoiceData}
				/>
			))}
		</div>
	);
}

export default InvoiceItem;
