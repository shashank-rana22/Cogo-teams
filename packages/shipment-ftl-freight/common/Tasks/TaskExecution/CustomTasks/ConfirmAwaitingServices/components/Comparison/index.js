import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './style.module.css';

function Comparison({
	ftl_freight_rates_count = GLOBAL_CONSTANTS?.zeroth_index,
	shipment_flash_booking_rates_count = GLOBAL_CONSTANTS?.zeroth_index,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.heading}>RMS Rate Count</div>
				<div className={cl`${styles.info} ${(ftl_freight_rates_count) ? (null) : (styles.red_text)}`}>
					{ftl_freight_rates_count}
				</div>
			</div>

			<div className={styles.divider} />

			<div className={styles.card}>
				<div className={styles.heading}>Flashed Rate Count</div>
				<div
					className={cl`${styles.info} ${(shipment_flash_booking_rates_count) ? (null) : (styles.red_text)}`}
				>
					{shipment_flash_booking_rates_count}
				</div>
			</div>
		</div>
	);
}

export default Comparison;
