import formatAmount from '@cogoport/globalization/utils/formatAmount';

import CardList from './CardList';
import { invoiceTable } from './InvoiceTable';
import styles from './styles.module.css';

const BILLED_ITEMS_CODE = ['BookingCONV', 'BookingNOST'];

const format = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 2,
	},
});

function InvoiceServiceWise({ item = {}, loading = false }) {
	const {
		service_total_discounted = '',
		service_total_currency = '',
		tax_total_discounted = '',
		total_price_discounted = '',
		line_items = [],
		quotation_source = '',
		detail = {},
	} = item || {};

	const showBilledText = (items) => !!BILLED_ITEMS_CODE.includes(items?.code);
	line_items.every(showBilledText);

	const renderBilledText = showBilledText && quotation_source === 'billed_at_actuals' ? '*will be billed at actuals'
		: null;

	return (
		<div className={styles.container}>
			<CardList
				loading={loading}
				fields={invoiceTable(item)}
				data={line_items || [{}]}
				detail={detail}
			/>

			<div className={styles.totals}>

				<div className={styles.tax_info}>

					Total Tax:
					{' '}
					{format(tax_total_discounted, service_total_currency)}

				</div>

				<div className={styles.total_tax}>

					Total w/o Tax:
					{' '}
					{format(total_price_discounted, service_total_currency)}

				</div>
			</div>

			<div className={styles.total_container}>
				<div className={styles.billed_text}>{renderBilledText}</div>

				Total Amount After Tax :

				<div className={styles.total_amount}>
					{format(service_total_discounted, service_total_currency)}
				</div>

			</div>
		</div>
	);
}

export default InvoiceServiceWise;
