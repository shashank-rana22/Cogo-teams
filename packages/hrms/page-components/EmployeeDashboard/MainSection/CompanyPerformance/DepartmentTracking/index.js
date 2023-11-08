import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect } from 'react';

import MyResponsiveBar from '../MyResponsiveBar';

import styles from './styles.module.css';

function DepartmentTracking({
	depDetails = [],
	getDepartmentWise = () => {},
	summaryData = {},
	setFilters = () => {},
	filters = {},
}) {
	const { department_list } = summaryData || {};

	const lableList = (department_list || []).map((item) => ({
		label : item.department_name,
		value : item.id,
	}));

	useEffect(() => {
		setFilters((prev) => ({ ...prev, department_id: department_list?.[GLOBAL_CONSTANTS.zeroth_index]?.id }));
	}, [department_list, setFilters]);

	return (
		<div className={styles.department_track_section}>
			<div className={styles.header}>
				<div className={styles.header_left}>
					<span className={styles.header_left_top}>Department Tracking</span>
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
