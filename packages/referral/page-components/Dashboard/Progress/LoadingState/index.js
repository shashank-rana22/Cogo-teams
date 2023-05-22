import { Placeholder } from '@cogoport/components';
import React from 'react';

import ReferralTypes from '../Cogopoints/ReferralTypes';

import styles from './styles.module.css';

function LoadingState() {
	const pieChart = () => (
		<div className={styles.pie_chart_container}>
			<div className={styles.circle} />
			<Placeholder type="circle" radius="120px" />

		</div>

	);

	return (
		<div className={styles.container}>
			<div className={styles.users}>
				<div className={styles.title}>USERS</div>
				<div className={styles.chart_container}>
					<div className={styles.chart}>
						{pieChart()}
					</div>
					<div className={styles.chart_status}>
						{[...Array(6)].map((itm) => (
							<Placeholder className={styles.status} key={itm} />
						))}

					</div>
				</div>
			</div>
			<div className={styles.cogopoints}>
				<div className={styles.header}>
					<div className={styles.title}>
						COGOPOINTS
					</div>
					<div className={styles.referral_types}>
						<ReferralTypes />
					</div>
				</div>
				<div className={styles.cogopoints_container}>
					<div className={styles.circle_div}>
						{pieChart()}
					</div>

					<div className={styles.points_div}>
						<Placeholder width="100%" height="30px" />
					</div>

					<div className={styles.points_last_div}>
						<Placeholder width="100%" height="30px" />
					</div>

				</div>
			</div>
			<div className={styles.networks}>
				<div className={styles.title}>NETWORKS</div>
				<div className={styles.networks_chart}>
					{[...Array(6)].map((itm) => (
						<Placeholder className={styles.networks_skeleton} key={itm} />
					))}

				</div>
			</div>
		</div>
	);
}

export default LoadingState;