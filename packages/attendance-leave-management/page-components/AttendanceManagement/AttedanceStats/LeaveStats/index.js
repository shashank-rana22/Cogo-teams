import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LeaveStats() {
	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.title}>Leaves Stats</div>
				<div className={styles.pending_approval}>
					<div className={styles.pending_dot} />
					2 Pending Approval
				</div>
			</div>
			<div className={styles.leave_stats_data}>
				<div>
					<div className={styles.leave_stats_data_item}>
						Privilege Leaves
					</div>
					<div className={styles.stats_number}>
						3
					</div>
				</div>
				<div>
					<div className={styles.leave_stats_data_item}>
						Casual Leaves
					</div>
					<div className={styles.stats_number}>
						3
					</div>
				</div>
				<div>
					<div className={styles.leave_stats_data_item}>
						Sick Leaves
					</div>
					<div className={styles.stats_number}>
						3
					</div>
				</div>
			</div>
			<Button
				size="lg"
				className={styles.apply_btn}
				themeType="secondary"
			>
				Apply for Leaves
			</Button>
		</div>
	);
}

export default LeaveStats;
