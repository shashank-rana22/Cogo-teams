import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import ApplyLeave from '../../../../common/ApplyLeave';
import useGetEmployeeLeaveBalances from '../../../../hooks/useGetEmployeeLeaveBalances';

import styles from './styles.module.css';

function LeaveStats({ value }) {
	const { data, refetch } = useGetEmployeeLeaveBalances({ value });

	const {
		available_privilege_leaves,
		available_casual_leaves, available_sick_leaves,
		pending_casual_leaves, pending_sick_leaves, pending_privilege_leaves,
	} = data || {};

	const [applyLeave, setApplyLeave] = useState(false);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header_flex}>
					<div className={styles.title}>Leaves Stats</div>
					<div className={styles.pending_approval}>
						<div className={styles.pending_dot} />
						{pending_casual_leaves + pending_privilege_leaves + pending_sick_leaves}
						{' '}
						Pending Approval
					</div>
				</div>
				<div className={styles.leave_stats_data}>
					<div className={styles.leave_data}>
						<div className={styles.leave_stats_data_item}>
							Privilege Leaves
						</div>
						<div className={styles.stats_number}>
							{available_privilege_leaves}
						</div>
					</div>
					<div className={styles.leave_data}>
						<div className={styles.leave_stats_data_item}>
							Casual Leaves
						</div>
						<div className={styles.stats_number}>
							{available_casual_leaves}
						</div>
					</div>
					<div className={styles.leave_data}>
						<div className={styles.leave_stats_data_item}>
							Sick Leaves
						</div>
						<div className={styles.stats_number}>
							{ available_sick_leaves}
						</div>
					</div>
				</div>
				<Button
					size="lg"
					className={styles.apply_btn}
					themeType="secondary"
					onClick={() => setApplyLeave(true)}
				>
					Apply for Leaves
				</Button>
			</div>
			{applyLeave && (
				<ApplyLeave
					show={applyLeave}
					onClose={() => setApplyLeave(false)}
					data={data}
					refetch={refetch}
				/>
			)}
		</>
	);
}

export default LeaveStats;
