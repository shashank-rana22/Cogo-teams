import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function TotalCost({ rate = {}, disableButton = false }) {
	const { tax_total_price_discounted, tax_total_price_currency = '' } = rate;

	const totalDisplayString = formatAmount({
		amount   : tax_total_price_discounted,
		currency : tax_total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'symbol',
			maximumFractionDigits : 2,
		},
	});

	return (
		<div className={cl`${styles.amount} ${disableButton && styles.disabled}`}>
			{totalDisplayString}
		</div>
	);
}

export default TotalCost;
