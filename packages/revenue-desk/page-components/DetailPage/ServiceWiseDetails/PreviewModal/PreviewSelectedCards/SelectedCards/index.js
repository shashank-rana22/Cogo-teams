import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { INCREMENT_BY_ONE, VALUE_ZERO } from '../../../../../constants';

import SingleSelectedCard from './SingleSelectedCard';
import styles from './styles.module.css';

function SelectedCards({ prefrences, shipmentType }) {
	let wallet_amount = 0;

	(prefrences || []).forEach((pref) => {
		const buy = pref?.data?.rowData?.total_buy_price_in_preferred_currency || VALUE_ZERO;
		const sell = pref?.data?.rowData?.total_sell_price_in_preferred_currency || VALUE_ZERO;
		if ((buy - sell) > wallet_amount) {
			wallet_amount = buy - sell;
		}
	});
	return (
		<div>
			{wallet_amount > VALUE_ZERO && (
				<div className={styles.label}>
					Wallet Used :
					{' '}
					<div className={styles.value}>
						{formatAmount({
							amount   : wallet_amount,
							currency : 'USD',
							options  : {
								style: 'currency',
							},
						}) || '-'}
					</div>
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
