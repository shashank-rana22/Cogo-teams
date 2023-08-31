import { cl } from '@cogoport/components';
import React from 'react';

import styles from './style.module.css';

function Comparison(data) {
	const {
		ftl_freight_rates_count = 0,
		shipment_flash_booking_rates_count = 0,
	} = data?.data || {};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.heading}>RMS Rate Count</div>
				<div className={cl`${styles.info} ${(ftl_freight_rates_count) ? (null) : (styles.isZero)}`}>
					{ftl_freight_rates_count}
				</div>
			</div>

			<div className={styles.divider} />

			<div className={styles.card}>
				<div className={styles.heading}>Flashed Rate Count</div>
				<div className={cl`${styles.info} ${(shipment_flash_booking_rates_count) ? (null) : (styles.isZero)}`}>
					{shipment_flash_booking_rates_count}
				</div>
			</div>
		</div>
	);
}

export default Comparison;
