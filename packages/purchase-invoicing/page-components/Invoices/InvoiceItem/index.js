import getFormattedAmount from '../../../common/helpers/formatAmount';

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
					<div className={styles.label}>Collection Party</div>
				</div>

				<div className={styles.invoice_value_container}>
					<div className={styles.invoice_value_title}>Invoice Value -</div>
					<div className={styles.invoice_value}>
						{getFormattedAmount(total?.total_price_discounted, total?.total_price_currency)}
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
