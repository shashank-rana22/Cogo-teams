import formatAmount from '@cogoport/globalization/utils/formatAmount';

import Item from './Item';
import styles from './styles.module.css';

function InvoiceItem({
	item = {},
	total = {},
	loading = false,
	invoicesList = [],
	bfInvoiceRefetch = () => {},
	purchaseInvoicesRefetch = () => {},
}) {
	return (
		<main className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.invoice_party_details}>
					<div className={styles.invoice_party_name}>{item?.name || item?.business_name}</div>
					<div className={styles.label}>Invoicing Party</div>
				</div>

				<div className={styles.invoice_value_container}>
					<div className={styles.invoice_value_title}>Invoice Value -</div>
					<div className={styles.invoice_value}>
						{formatAmount({
							amount   : total?.total_price_discounted,
							currency : total?.total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
				</div>
			</div>

			<div className={styles.invoice_list_wrapper}>
				{(item?.invoices || []).map((invoice) => (
					<Item
						key={invoice?.id}
						invoice={invoice}
						loading={loading}
						invoicesList={invoicesList}
						bfInvoiceRefetch={bfInvoiceRefetch}
						purchaseInvoicesRefetch={purchaseInvoicesRefetch}
					/>
				))}
			</div>
		</main>
	);
}

export default InvoiceItem;
