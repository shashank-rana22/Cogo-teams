import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import Loader from '../../../../../common/Loader';
import useGetLeaveStats from '../../../../../hooks/useGetLeaveBalances';

import styles from './styles.module.css';

function LeaveBalance() {
	const { data, loading } = useGetLeaveStats();
	const router = useRouter();

	const {
		available_casual_leaves, available_privilege_leaves, available_sick_leaves,
		total_pending_leave_approvals,
	} = data || {};

	if (loading) {
		return (
			<div className={styles.container}>
				<Loader height="20px" count={3} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.header_title}>
					Leaves Balance
				</div>
				<div className={styles.pending_leaves}>
					<div className={styles.leaves_dot} />
					{' '}
					{total_pending_leave_approvals || 0}
					{' '}
					Pending
				</div>
			</div>
			<div className={styles.leaves_data}>
				<div className={styles.leave_type}>
					<div className={styles.leave_count}>
						{available_privilege_leaves || 0}
					</div>
					Privilege Leaves
				</div>
				<div className={styles.leave_type}>
					<div className={styles.leave_count}>
						{available_casual_leaves || 0}
					</div>
					Casual Leaves
				</div>
				<div className={styles.leave_type}>
					<div className={styles.leave_count}>
						{available_sick_leaves || 0}
					</div>
					Sick Leaves
				</div>
			</div>
			<div
				className={styles.apply_leave}
				onClick={() => router.push('/attendance-leave-management?activeTab=leaves')}
				aria-hidden
			>
				Apply Leave
				{' '}
				<IcMArrowRight style={{ marginLeft: 8 }} />
			</div>
		</div>
	);
}

export default LeaveBalance;
