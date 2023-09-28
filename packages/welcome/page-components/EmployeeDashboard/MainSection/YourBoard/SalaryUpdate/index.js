import { cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function SalaryUpdate() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Salary Update
			</div>
			<div className={styles.summary}>
				<div className={cl`${styles.avg_data} ${styles.mr_30}`}>
					<div className={styles.avg_summary}>
						23
					</div>
					Payable Days
				</div>
				<div className={styles.avg_data}>
					<div className={styles.avg_summary}>
						Disbursed
					</div>
					Payroll Status
				</div>
			</div>
			<div className={styles.footer}>
				<div>
					Aug 2023
				</div>
				<div className={styles.view_payslip}>
					View Payslip
					{' '}
					<IcMArrowRight style={{ marginLeft: 8 }} />
				</div>
			</div>
		</div>
	);
}

export default SalaryUpdate;
