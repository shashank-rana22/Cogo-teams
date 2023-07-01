import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const eachOrder = (item) => {
	const {
		product_retailer_id = '',
		quantity = '', item_price = 0, currency = '', name = '', description = '', image_url = '',
	} = item || {};
	return (
		<div className={styles.list_item} key={product_retailer_id}>
			<img src={image_url} alt={name} className={styles.img_styles} />
			<div>
				<div className={styles.catalog_name}>{name}</div>
				<div className={styles.catalog_desc}>{description}</div>
				<div className={styles.price_div}>
					<div className={styles.catalog_currency}>
						quantity&nbsp;
						{quantity}
					</div>
					<div className={styles.catalog_currency}>
						{formatAmount({
							amount  : item_price,
							currency,
							options : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								notation              : 'compact',
								compactDisplay        : 'short',
								minimumFractionDigits : 2,
							},
						})}
					</div>
				</div>
			</div>

		</div>
	);
};

function OrderDisplay({ message = '' }) {
	const orderList = JSON.parse(message) || [];

	return (
		<div className={styles.list_order}>
			{orderList.map(eachOrder)}
		</div>
	);
}
export default OrderDisplay;
