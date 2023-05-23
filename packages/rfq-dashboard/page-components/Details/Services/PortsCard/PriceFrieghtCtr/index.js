import { getFormattedAmount } from '../../../../../common/helpers/getFormattedSum';

import styles from './styles.module.css';

function PriceFreightCtr({
	freight_price_currency = 'INR',
	freight_price_discounted = '',
	total_price_discounted = '',
	total_price_currency = 'INR',
}) {
	console.log('total_price_discounted::::', total_price_discounted);
	// const {
	// 	total_price_discounted,
	// 	total_price_currency,
	// 	freight_price_currency,
	// 	freight_price_discounted,
	// 	service_type,
	// } = rates;

	// const UNIT_MAPPING = {
	// 	fcl_freight: '/Ctr',
	// 	lcl_freight: '/Wm',
	// 	air_freight: '/Kg',
	// };

	const data = [
		{
			label  : 'Price / Ctr',
			amount : `${total_price_currency} ${total_price_discounted}`,

		},
		{
			label  : 'Freight / Ctr',
			amount : `${freight_price_currency} ${freight_price_discounted}`,
		},
	];
	return (

		<div className={styles.container}>
			{
				data.map((Item) => (
					<div className={styles.get_amount_section}>
						<div className={styles.get_amount_type}>{Item.label}</div>
						<div className={styles.get_amount_value}>{getFormattedAmount(Item.amount, 'INR')}</div>
					</div>
				))
			}
		</div>
	);
}
export default PriceFreightCtr;

/* <BasicContainer>
<BasicType>Price{UNIT_MAPPING[service_type]}</BasicType>
<BasicPrice>
	{formatAmount({
		amount: total_price_discounted,
		currency: total_price_currency,
		options: {
			style: 'currency',
			currencyDisplay: 'code',
			maximumFractionDigits: 0,
		},
	})}
</BasicPrice>
</BasicContainer>
<BasicContainer freight>
<BasicType>Freight{UNIT_MAPPING[service_type]}</BasicType>
<LocalPrice>
	{formatAmount({
		amount: freight_price_discounted,
		currency: freight_price_currency,
		options: {
			style: 'currency',
			currencyDisplay: 'code',
			maximumFractionDigits: 0,
		},
	})}
</LocalPrice>
</BasicContainer> */
