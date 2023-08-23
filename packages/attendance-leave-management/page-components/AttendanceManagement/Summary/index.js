import React from 'react';

import styles from './styles.module.css';

const data = [
	{
		label : 'Days Present',
		key   : 'days_present',
	},
	{
		label : 'Days Absent',
		key   : 'days_absent',
	},
	{
		label : 'Leave Taken',
		key   : 'leave_taken',
	},
	{
		label : 'Weekly Off',
		key   : 'weekly_off',
	},
	{
		label : 'Holiday',
		key   : 'holiday',
	},
	{
		label : 'Invalid Records',
		key   : 'invalid_records',
	},
	{
		label : 'Total Hours',
		key   : 'total_hours',
	},
	{
		label : 'Total Deviation',
		key   : 'total_deviation',
	},
];

function Summary() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Monthly Summary
			</div>
			<div className={styles.summary_container}>
				{data.map((val) => (
					<div key={val.key} className={styles.item}>
						<div className={styles.label}>
							{val.label}
						</div>
						<div className={styles.num_value}>
							0
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Summary;
