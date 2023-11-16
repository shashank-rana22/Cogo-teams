import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function SalaryUpdate({ data }) {
	const { payable_days, payroll_status } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Salary Update
			</div>
			<div className={styles.summary}>
				<div className={cl`${styles.avg_data} ${styles.mr_30}`}>
					<div className={styles.avg_summary}>
						{payable_days || 0}
					</div>
					Payable Days
				</div>
				<div className={styles.avg_data}>
					<div className={styles.avg_summary}>
						{payroll_status || 'NA'}
					</div>
					Payroll Status
				</div>
			</div>
		</div>
	);
}

export default SalaryUpdate;
