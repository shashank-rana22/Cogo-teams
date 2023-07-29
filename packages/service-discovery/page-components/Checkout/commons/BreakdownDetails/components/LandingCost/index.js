import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { convertCurrencyValue } from '../../../../helpers/dynamic-values';

import styles from './styles.module.css';

function LandingCost({
	convenienceDetails = {},
	conversions = {},
	rate = {},
	total = 0,
}) {
	const {
		tax_price_discounted,
		total_price_currency = '',
		tax_price_currency = '',
	} = rate || {};

	const { convenience_rate } = convenienceDetails;

	const { price = 0, currency = '', quantity = 1 } = convenience_rate;

	const finalConvenienceFee = convertCurrencyValue(
		price * quantity,
		currency,
		total_price_currency,
		conversions,
	);

	const finalTaxValue = convertCurrencyValue(
		tax_price_discounted,
		tax_price_currency,
		total_price_currency,
		conversions,
	);

	const totalCost = total + finalConvenienceFee + finalTaxValue;

	return (
		<div className={styles.container}>
			<div className={styles.convenience_container}>
				<div className={styles.text}>Total Landed Cost :</div>

				<div className={styles.amount}>
					{formatAmount({
						amount   : totalCost,
						currency : rate?.total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
						},
					})}
				</div>
			</div>
		</div>
	);
}

export default LandingCost;
