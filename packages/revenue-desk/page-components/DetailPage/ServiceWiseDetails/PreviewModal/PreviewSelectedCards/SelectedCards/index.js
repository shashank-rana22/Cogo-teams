import { INCREMENT_BY_ONE, VALUE_ZERO } from '../../../../../constants';

import SingleSelectedCard from './SingleSelectedCard';

function SelectedCards({ prefrences, shipmentType }) {
	let wallet_amount = 0;

	(prefrences || []).forEach((pref) => {
		const buy = pref?.data?.rowData?.total_buy_price_in_preferred_currency;
		const sell = pref?.data?.rowData?.total_sell_price_in_preferred_currency;
		if ((buy - sell) > wallet_amount) {
			wallet_amount = buy - sell;
		}
	});
	return (
		<div>
			{wallet_amount > VALUE_ZERO && (
				<div>
					Wallet Used :
					{' '}
					{wallet_amount}
				</div>
			)}
			{prefrences?.map((singleItem, index) => (
				<SingleSelectedCard
					data={singleItem?.data}
					priority={index + INCREMENT_BY_ONE}
					shipmentType={shipmentType}
					key={singleItem?.rate_id}
					fromKey={singleItem?.key}
				/>
			))}
		</div>
	);
}

export default SelectedCards;
