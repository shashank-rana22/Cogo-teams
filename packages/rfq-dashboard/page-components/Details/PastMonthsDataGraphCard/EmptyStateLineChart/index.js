import React from 'react';

import { emptyChart } from '../../../../constants';

import styles from './styles.module.css';

function EmptyLineChart() {
	return (
		<div className={styles.empty_state}>
			<div className={styles.empty_image_container}>
				<img
					src={emptyChart}
					alt="Empty State"
					className={styles.empty_state_icon}
					width="105px"
				/>
			</div>
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />
			<div className={styles.horizontal_line} />

		</div>
	);
}

export default EmptyLineChart;
