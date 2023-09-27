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
		freight_price_discounted:price = 0,
		freight_price_currency = 'INR',
	} = rate || {};

	const freight_price = detail.service_type === 'air_freight' && !rate.is_minimum_threshold_rate
		? price / (detail?.chargeable_weight || DEFAULT_DIVISOR_VALUE) || DEFAULT_PRICE_VALUE
		: price || DEFAULT_PRICE_VALUE;

	const showKgTag = detail.service_type === 'air_freight' && !rate.is_minimum_threshold_rate;

	return (
		<div className={styles.container}>
			<div className={styles.price_item}>
				<span className={styles.label}>Basic Freight Price</span>

				<PricePerPackage
					price={freight_price}
					price_currency={freight_price_currency}
					showKgTag={showKgTag}
				/>
			</div>

			<div className={styles.price_item}>
				<span className={styles.label}>Total Freight Price</span>

				<PricePerPackage
					price={total_price_discounted}
					price_currency={total_price_currency}
					isTotalPrice
				/>
			</div>
		</div>
	);
}

export default FreightPrice;
