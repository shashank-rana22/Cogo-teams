import { Select } from '@cogoport/components';
import React from 'react';

import MyResponsiveBar from '../MyResponsiveBar';

import styles from './styles.module.css';

function DepartmentTracking({
	depDetails = [],
	getDepartmentWise = () => {},
	summaryData = {},
	setFilters = () => {},
	filters = {},
}) {
	console.log(summaryData, 'sum');

	const { department_list } = summaryData || {};

	console.log(department_list, 'dd');

	const lableList = (department_list || []).map((item) => ({
		label : item.department_name,
		value : item.id,
	}));

	return (
		<div className={styles.department_track_section}>
			<div className={styles.header}>
				<div className={styles.header_left}>
					<span className={styles.header_left_top}>Department Tracking</span>
					<span className={styles.header_left_bottom}>Story Points</span>
				</div>
				<div className={styles.header_right}>
					<Select
						placeholder="Department"
						options={lableList}
						value={filters?.department_id}
						onChange={(e) => setFilters((prev) => ({ ...prev, department_id: e }))}
					/>
				</div>
			</div>
			<MyResponsiveBar depDetails={depDetails} getDepartmentWise={getDepartmentWise} summaryData={summaryData} />
		</div>
	);
}

export default DepartmentTracking;
