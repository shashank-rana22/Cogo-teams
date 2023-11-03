import { cl } from '@cogoport/components';

import PricePerPackage from './PricePerPackage';
import styles from './styles.module.css';

const DEFAULT_PRICE_VALUE = 0;
const DEFAULT_DIVISOR_VALUE = 1;

function FreightPrice({
	rate = {},
	detail = {},
}) {
	const {
		total_price_discounted = 0,
		total_price_currency = 'INR',
		total_price = 0,
		freight_price_discounted:price = 0,
		freight_price_currency = 'INR',
		freight_price:totalFreight = 0,
	} = rate || {};

	const discounted_freight_price = rate.is_minimum_threshold_rate ? price || DEFAULT_PRICE_VALUE
		: price / (detail?.chargeable_weight || DEFAULT_DIVISOR_VALUE) || DEFAULT_PRICE_VALUE;

	const total_freight_price = rate.is_minimum_threshold_rate ? totalFreight || DEFAULT_PRICE_VALUE
		: totalFreight / (detail?.chargeable_weight || DEFAULT_DIVISOR_VALUE) || DEFAULT_PRICE_VALUE;

	const showKgTag = detail.service_type === 'air_freight' && !rate.is_minimum_threshold_rate;

	return (
		<div className={styles.container}>
			<div className={styles.price_item}>
				<span className={styles.label}>Freight Price</span>

				<PricePerPackage
					price={discounted_freight_price}
					price_currency={freight_price_currency}
					total_price={total_freight_price}
					showKgTag={showKgTag}
				/>
			</div>

			<div className={cl`${styles.price_item} ${styles.total}`}>
				<span className={styles.label}>Total Freight Price</span>

				<PricePerPackage
					price={total_price_discounted}
					price_currency={total_price_currency}
					total_price={total_price}
					total
				/>
			</div>
		</div>
	);
}

export default FreightPrice;
