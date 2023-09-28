import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function LeaveBalance() {
	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.header_title}>
					Leaves Balance
				</div>
				<div className={styles.pending_leaves}>
					<div className={styles.leaves_dot} />
					{' '}
					2 Pending
				</div>
			</div>
			<div className={styles.leaves_data}>
				<div className={styles.leave_type}>
					<div className={styles.leave_count}>
						3
					</div>
					Privilege Leaves
				</div>
				<div className={styles.leave_type}>
					<div className={styles.leave_count}>
						3
					</div>
					Casual Leaves
				</div>
				<div className={styles.leave_type}>
					<div className={styles.leave_count}>
						3
					</div>
					Sick Leaves
				</div>
			</div>
			<div className={styles.apply_leave}>
				Apply Leave
				{' '}
				<IcMArrowRight style={{ marginLeft: 8 }} />
			</div>
		</div>
	);
}

export default LeaveBalance;
