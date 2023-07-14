import React from 'react';

import styles from './styles.module.css';

function CustomerCountCard({ isBooking, title, count }) {
	return (
		<div className={styles.container}>
			<div className={`${styles.flex_div} ${isBooking ? styles.customer_card : styles.pt}`}>
				<div className={styles.title_tag}>
					{title}
				</div>
				<div className={styles.count_tag}>{count}</div>
			</div>
		</div>
	);
}
export default CustomerCountCard;
