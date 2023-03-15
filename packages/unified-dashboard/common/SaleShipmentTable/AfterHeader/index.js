import React from 'react';

import styles from './styles.module.css';

function AfterHeader({ showGrid }) {
	return (
		<div>
			{showGrid && (
				<div className={styles.card_wrapper}>
					<div className={styles.row}>
						<div className={styles.revenue_col}>
							Booking Date
						</div>
						<div className={styles.revenue_col}>
							Shipping Line
						</div>
						<div className={styles.revenue_col}>
							Shipment Type
						</div>
						<div className={styles.revenue_col}>
							PortPair
						</div>
						<div className={styles.revenue_col}>
							Shipper
						</div>
						<div className={styles.revenue_col}>
							Booking Reference No.
						</div>
						<div className={styles.revenue_col}>
							ETA
						</div>
						<div className={styles.revenue_col}>
							ETD
						</div>
						<div className={styles.revenue_col}>
							Status
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default AfterHeader;
