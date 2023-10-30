import React from 'react';

import LoadingState from '../LoadingState';

import BarChart from './BarChart';
import styles from './styles.module.css';

function OutstandingByAge({ data, loading }) {
	return (
		<div>
			<div className={styles.container}>

				<div className={styles.heading_text}>
					<div className={styles.text}>
						Outstanding
						<div className={styles.heading}>
							By Age
						</div>
					</div>

				</div>
				<div className={styles.vr} />
				{loading ? (
					<LoadingState />
				)
					: <BarChart data={data} />}
			</div>
		</div>
	);
}
export default OutstandingByAge;
