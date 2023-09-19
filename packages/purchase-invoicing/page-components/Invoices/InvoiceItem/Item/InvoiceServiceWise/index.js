import getFormattedAmount from '../../../../../common/helpers/formatAmount';

import CardList from './CardList';
import { invoiceTable } from './InvoiceTable';
import styles from './styles.module.css';

const BILLED_ITEMS_CODE = ['BookingCONV', 'BookingNOST'];

const TWO = 2;

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
					{getFormattedAmount(tax_total_discounted, service_total_currency, TWO)}

				</div>

				<div className={styles.total_tax}>

					Total w/o Tax:
					{' '}
					{getFormattedAmount(total_price_discounted, service_total_currency, TWO)}

				</div>
			</div>

			<div className={styles.total_container}>
				<div className={styles.billed_text}>{renderBilledText}</div>

				Total Amount After Tax :

				<div className={styles.total_amount}>
					{getFormattedAmount(service_total_discounted, service_total_currency, TWO)}
				</div>

			</div>
		</div>
	);
}

export default InvoiceServiceWise;
