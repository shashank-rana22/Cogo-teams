import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const getFormattedAmt = ({ currency, amount }) => formatAmount({
	currency,
	amount,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	},
});

function TooltipContent({ item = {} }) {
	const {
		currency,
		discount_amount = 0,
		total_tax_amount = 0,
	} = item || {};

	return (
		<div className={styles.tooltip_content}>
			<div className={styles.row}>
				<p>Discount Amount: </p>
				<p>{getFormattedAmt({ currency, amount: discount_amount })}</p>
			</div>

			<div className={styles.row}>
				<p>Tax Amount: </p>
				<p>{getFormattedAmt({ currency, amount: total_tax_amount })}</p>
			</div>
		</div>
	);
}

export default TooltipContent;
