import { Select } from '@cogoport/components';
import React from 'react';

import MyResponsiveBar from '../MyResponsiveBar';

import styles from './styles.module.css';

const options = [
	{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
];

function DepartmentTracking() {
	return (
		<div className={styles.department_track_section}>
			<div className={styles.header}>
				<div className={styles.header_left}>
					<span className={styles.header_left_top}>Department Tracking</span>
					<span className={styles.header_left_bottom}>Story Points</span>
				</div>
				<div className={styles.header_right}>
					<Select placeholder="Story Points" options={options} />
					<Select placeholder="Design" options={options} />
					<Select placeholder="Team Lead" options={options} />
				</div>
			</div>
			<MyResponsiveBar />
		</div>
	);
}

export default DepartmentTracking;
