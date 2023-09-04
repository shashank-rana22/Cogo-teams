import { Button, Placeholder } from '@cogoport/components';
import React, { useState } from 'react';

import ApplyLeave from '../../../../common/ApplyLeave';
import useGetEmployeeLeaveBalances from '../../../../hooks/useGetEmployeeLeaveBalances';

import styles from './styles.module.css';

function LeaveStats({ value = '' }) {
	const { loading, data, refetch } = useGetEmployeeLeaveBalances({ value });

	const {
		available_privilege_leaves = 0,
		available_casual_leaves = 0, available_sick_leaves = 0,
		total_pending_leave_approvals = 0,
	} = data || {};

	const [applyLeave, setApplyLeave] = useState(false);

	function LoadingPlaceholder() {
		return (
			<Placeholder height="20px" width="100px" margin="0px 0px 20px 0px" />
		);
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header_flex}>
					<div className={styles.title}>Leaves Stats</div>
					{loading ? <LoadingPlaceholder />
						: (
							<div className={styles.pending_approval}>
								<div className={styles.pending_dot} />
								{ total_pending_leave_approvals}
								{' '}
								Pending Approval
							</div>
						)}
				</div>
				<div className={styles.leave_stats_data}>
					<div className={styles.leave_data}>
						<div className={styles.leave_stats_data_item}>
							Privilege Leaves
						</div>
						<div className={styles.stats_number}>
							{loading
								? <LoadingPlaceholder />
								: available_privilege_leaves }
						</div>
					</div>
					<div className={styles.leave_data}>
						<div className={styles.leave_stats_data_item}>
							Casual Leaves
						</div>
						<div className={styles.stats_number}>
							{loading
								? <LoadingPlaceholder />
								: available_casual_leaves }
						</div>
					</div>
					<div className={styles.leave_data}>
						<div className={styles.leave_stats_data_item}>
							Sick Leaves
						</div>
						<div className={styles.stats_number}>
							{loading
								? <LoadingPlaceholder />
								: available_sick_leaves }
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
