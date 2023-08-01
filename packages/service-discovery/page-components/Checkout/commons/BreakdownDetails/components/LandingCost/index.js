import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { convertCurrencyValue } from '../../../../helpers/dynamic-values';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

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

	const totalBeforeDiscount = rate?.tax_total_price || DEFAULT_VALUE;
	const totalPrice = rate?.tax_total_price_discounted || DEFAULT_VALUE;
	const discount = totalPrice - totalBeforeDiscount;

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

	const totalCost = total + finalConvenienceFee + finalTaxValue + discount;

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
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>
		</div>
	);
}

export default LandingCost;
