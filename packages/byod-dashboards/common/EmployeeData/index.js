import { startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_DATA } from '../../configurations/employeeDataMapping';

import styles from './styles.module.css';

function EmployeeData({ data }) {
	const { detail } = data || {};
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Employee Details :</div>
			<div className={styles.item_container}>
				{EMPLOYEE_DATA.map((val) => (
					<div className={styles.detail} key={val.key}>
						<div className={styles.label}>
							{val.label}
							{' '}
							:
						</div>
						<div className={styles.employee_detail}>{startCase(detail?.[val.key]) || '-'}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default EmployeeData;
