import PricePerPackage from './PricePerPackage';
import styles from './styles.module.css';

function FreightPrice({ rate = {}, isContract = false }) {
	const {
		total_price_discounted = 0,
		total_price_currency = 'INR',
		freight_price_discounted = 0,
		freight_price_currency = 'INR',
	} = rate || {};

	return (
		<div className={styles.container}>
			<div className={styles.price_item}>
				<span className={styles.label}>
					{isContract ? 'Locked' : 'Basic'}
					{' '}
					Freight Price
				</span>

				<PricePerPackage
					price={freight_price_discounted}
					price_currency={freight_price_currency}
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
