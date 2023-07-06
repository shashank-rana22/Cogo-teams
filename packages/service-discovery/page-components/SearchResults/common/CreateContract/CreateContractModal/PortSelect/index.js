import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function PortSelect({ portDetail = {} }) {
	const {
		origin_port = {},
		destination_port = {},
		container_type,
		container_size,
		commodity,
		origin_airport,
		destination_airport,
		volume,
		weight,
		inco_term,
		trade_type,
	} = portDetail || {};

	return (
		<div className={styles.cardRow}>
			<div className={styles.card}>
				<div className={styles.topSection}>
					<div className={styles.portName}>
						{origin_port?.display_name || origin_airport?.display_name || '-'}
					</div>
					<div className={styles.portArrow}>
						<IcMPortArrow />
					</div>
					<div className={styles.portName}>
						{destination_port?.display_name || destination_airport?.display_name || '-'}
					</div>
				</div>
				<div className={styles.bottomSection}>
					{/* Remaining JSX code */}
				</div>
			</div>
		</div>
	);
}

export default PortSelect;
