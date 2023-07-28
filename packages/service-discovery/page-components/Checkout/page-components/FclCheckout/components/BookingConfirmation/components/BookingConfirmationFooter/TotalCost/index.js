import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function TotalCost({ rate = {} }) {
	const { tax_total_price_discounted, tax_total_price_currency = '' } = rate;

	const totalDisplayString = formatAmount({
		amount   : tax_total_price_discounted,
		currency : tax_total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.amount}>{totalDisplayString}</div>
			<div className={styles.text}>TOTAL</div>
		</div>
	);
}

export default TotalCost;
