import PricePerPackage from './PricePerPackage';
import styles from './styles.module.css';

function FreightPrice({
	rate = {},
	// primary_service = {},
}) {
	const {
		total_price_discounted = 0,
		total_price_currency = 'INR',
		freight_price_discounted = 0,
		freight_price_currency = 'INR',
	} = rate || {};

	// const {
	// 	packages_count:total_packages_count = 0,
	// 	total_price_discounted:per_package_price = 0,
	// 	total_price_currency:per_packacge_price_currency = 'INR',
	// 	packages = [],
	// } = primary_service || [];

	return (
		<div className={styles.container}>
			<div className={styles.packages_price_container}>
				{/* {(packages || []).map((packageItem) => {
					const { packages_count = 0 } = packageItem;

					return (
						<div className={styles.price_item} key={packageItem?.id}>
							<span className={styles.label}>Basic Freight Price</span>

							<PricePerPackage
								price={per_package_price}
								price_currency={per_packacge_price_currency}
								packages_count={packages_count}
							/>
						</div>
					);
				})} */}

				<div className={styles.price_item}>
					<span className={styles.label}>Basic Freight Price</span>

					<PricePerPackage
						price={freight_price_discounted}
						price_currency={freight_price_currency}
					/>
				</div>
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
