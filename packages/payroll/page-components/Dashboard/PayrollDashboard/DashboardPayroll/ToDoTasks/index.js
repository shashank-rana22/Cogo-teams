import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const MONEY_VIEW_GREEN = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Money_view_green.svg';

function ToDoTasks({ data = {} }) {
	const router = useRouter();
	return (
		<div className={styles.main_container}>
			<span className={styles.heading}>
				To Do Tasks
			</span>
			<div className={styles.tasks}>
				<div className={styles.task}>
					<div className={styles.left_task}>
						<img src={MONEY_VIEW_GREEN} alt="MONEY_VIEW_GREEN" />
						<div className={styles.left_task_status}>
							<div className={styles.employee_count}>
								{data?.pending_payroll_employee_count}
								{' '}
								Employees not paid
							</div>
							<div className={styles.payroll_status}>Payroll Pending</div>
						</div>
					</div>
					<div className={styles.right_task}>
						<Button
							size="lg"
							themeType="secondary"
							className={styles.task_button}
							onClick={() => router.push('/payroll/payroll?run=run_payroll')}
						>
							Run Payroll

						</Button>
					</div>
				</div>
			</div>
		</div>

	);
}

export default ToDoTasks;
