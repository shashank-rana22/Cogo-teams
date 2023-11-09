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
	disableForm = false,
	handlingFeeDetails = {},
}) {
	const {
		total_price_currency = '',
		tax_total_price_discounted = 0,
	} = rate || {};

	const { convenience_rate } = convenienceDetails;

	const { handling_fees = {} } = handlingFeeDetails;

	const { price = 0, currency = '', quantity = 1 } = convenience_rate;

	const {
		price: handlingFeesPrice = 0,
		currency: handlingFeesCurrency = '',
		quantity: handlingFeesQuantity = 1,
	} = handling_fees || {};

	const finalConvenienceFee = convertCurrencyValue(
		price * quantity,
		currency,
		total_price_currency,
		conversions,
	);

	const finalHandlingFee = convertCurrencyValue(
		handlingFeesPrice * handlingFeesQuantity,
		handlingFeesCurrency,
		total_price_currency,
		conversions,
	) || 0;

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

	const totalCost = total + finalConvenienceFee + finalHandlingFee + otherChargesPrice;

	return (
		<div className={styles.container}>
			<div className={styles.convenience_container}>
				<div className={styles.text}>Total Cost :</div>

				<div className={styles.amount}>
					{formatAmount({
						amount   : disableForm ? tax_total_price_discounted : totalCost,
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
