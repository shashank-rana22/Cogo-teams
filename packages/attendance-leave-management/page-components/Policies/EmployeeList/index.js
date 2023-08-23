import { Select, Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import EmployeeTable from './EmployeeTable';
import styles from './styles.module.css';

function EmployeeList() {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<span className={styles.heading}>Assign Employee</span>
				<div className={styles.selected}>
					<span className={styles.num_selected}>Selected:</span>
					<span className={styles.num_show}>20 Employees</span>
				</div>

			</div>
			<div className={styles.emplist_header}>
				<span className={styles.emp_heading}>Employee List</span>
				<div className={styles.filters}>
					<div className={styles.selection_options}>
						<div className={styles.select}>
							<Select placeholder="Designation" />
						</div>
						<div className={styles.select}>
							<Select placeholder="Department" />
						</div>
						<div className={styles.select}>
							<Select placeholder="Location" />
						</div>
					</div>
					<Input
						size="md"
						prefix={<IcMSearchdark />}
						placeholder="Search"
					/>
				</div>
			</div>
			<div className={styles.container}>
				<EmployeeTable />
			</div>
		</div>
	);
}

export default EmployeeList;
