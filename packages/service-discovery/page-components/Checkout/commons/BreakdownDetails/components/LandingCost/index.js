import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { convertCurrencyValue } from '../../../../helpers/dynamic-values';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function LandingCost({
	convenienceDetails = {},
	conversions = {},
	rate = {},
	total = 0,
	otherCharges = [],
	showTaxes = false,
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

	const otherChargesPrice = otherCharges.reduce((acc, { total_price_discounted = 0, currency: chargesCurrency }) => {
		if (total_price_discounted) {
			return acc + convertCurrencyValue(
				total_price_discounted,
				chargesCurrency,
				total_price_currency,
				conversions,
			);
		}
		return acc;
	}, DEFAULT_VALUE);

	const totalCostExcludingTax = total + finalConvenienceFee + otherChargesPrice;

	const totalCost = totalCostExcludingTax + finalTaxValue;

	return (
		<div className={styles.container}>
			<div className={styles.convenience_container}>
				<div className={styles.text}>Total Cost :</div>

				<div className={styles.amount}>
					{formatAmount({
						amount   : showTaxes ? totalCost : totalCostExcludingTax,
						currency : rate?.total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>
		</div>
	);
}

export default LandingCost;
