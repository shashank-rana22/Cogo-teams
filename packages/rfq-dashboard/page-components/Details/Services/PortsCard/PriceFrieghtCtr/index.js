import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function PriceFreightCtr({
	freight_price_currency,
	freight_price_discounted = '',
	total_price_discounted = '',
	total_price_currency,
}) {
	const data = [
		{
			label  : 'Price : ',
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
			label  : 'Freight : ',
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

	return (
		<div className={styles.container}>
			{
				data.map((item) => {
					const { label = '', amount = '' } = item;
					return (
						<div className={styles.get_amount_section} key={label}>
							<div className={styles.get_amount_type}>{label}</div>
							<div className={styles.get_amount_value}>{amount}</div>
						</div>
					);
				})
			}
		</div>
	);
}
export default PriceFreightCtr;
