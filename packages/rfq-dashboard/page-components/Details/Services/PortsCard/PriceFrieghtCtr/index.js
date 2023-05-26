import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { getFormattedAmount } from '../../../../../common/helpers/getFormattedSum';

import styles from './styles.module.css';

function PriceFreightCtr({
	freight_price_currency = 'INR',
	freight_price_discounted = '',
	total_price_discounted = '',
	total_price_currency = 'INR',
}) {
	const data = [
		{
			label  : 'Price / Ctr',
			amount : formatAmount({
				amount   : total_price_discounted,
				currency : total_price_currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 0,
				},
			}),
		},
		{
			label  : 'Freight / Ctr',
			amount : formatAmount({
				amount   : freight_price_discounted,
				currency : freight_price_currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 0,
				},
			}),
		},
	];

	console.log('price data::', data);
	return (

		<div className={styles.container}>
			{
				data.map((Item) => (
					<div className={styles.get_amount_section}>
						<div className={styles.get_amount_type}>{Item.label}</div>
						<div className={styles.get_amount_value}>{Item.amount}</div>
					</div>
				))
			}
		</div>
	);
}
export default PriceFreightCtr;
