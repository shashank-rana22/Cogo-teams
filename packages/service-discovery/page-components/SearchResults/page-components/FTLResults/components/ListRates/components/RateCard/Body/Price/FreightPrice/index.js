import { cl } from '@cogoport/components';

import PricePerPackage from './PricePerPackage';
import styles from './styles.module.css';

function FreightPrice({ rate = {}, isContract = false, service_type = '' }) {
	const {
		total_price_discounted = 0,
		freight_price_discounted = 0,
		freight_price = 0,
		freight_price_currency = 'INR',
		total_price_currency = 'INR',
		total_price = 0,
		service_rates = {},
	} = rate || {};

	const primaryServiceRates = Object.values(service_rates).filter(
		(service) => service?.service_type === service_type,
	);

	const trucksCount = primaryServiceRates.reduce((acc, { trucks_count = 0 }) => acc + Number(trucks_count), 0);

	return (
		<div className={styles.container}>
			<div className={styles.price_item}>
				<span className={styles.label}>
					{isContract ? 'Locked' : ''}
					{' '}
					{primaryServiceRates.length > 1 ? 'Avg.' : ''}
					{' '}
					Freight Price
				</span>

				<PricePerPackage
					price={freight_price_discounted / (trucksCount || 1)}
					price_currency={freight_price_currency}
					total_price={freight_price / (trucksCount || 1)}
					total_price_currency={freight_price_currency}
				/>
			</div>

			<div className={cl`${styles.price_item} ${styles.total}`}>
				<span className={styles.label}>Total Landed Price</span>

				<PricePerPackage
					price={total_price_discounted}
					price_currency={total_price_currency}
					total_price={total_price}
					total_price_currency={total_price_currency}
					total
				/>
			</div>
		</div>
	);
}

export default FreightPrice;
