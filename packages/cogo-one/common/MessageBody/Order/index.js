import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function Order({ message }) {
	const orderList = JSON.parse(message) || [];
	const { image_url } = orderList?.[0] || {};
	const orderCount = orderList.length || 0;
	return (
		<div className={styles.order_container}>
			<img
				src={image_url}
				alt="order"
				className={styles.img_styles}
			/>
			<div className={styles.order_container}>
				<img
					src={GLOBAL_CONSTANTS.image_url.cart_png}
					alt="order"
					className={styles.order_icon}
				/>
				<div className={styles.items}>
					{orderCount > 1 ? `${orderCount} Items` : `${orderCount} Item`}
				</div>
			</div>
		</div>
	);
}
export default Order;
