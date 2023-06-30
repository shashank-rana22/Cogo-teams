import React from 'react';

import { EMPLOYEE_DETAIL_MAPPING } from '../../../configurations/employeeDetailMapping';

import styles from './styles.module.css';

const DEFAULT_GAP = 0;
const DEFAULT_LENGTH_CHECK = 0;

function EmployeeDetails({ data }) {
	const { diff_in_days, name, designation } = data || {};

	const { months_gap, days_gap, years_gap } = diff_in_days || {};

	const getDiffDays = () => {
		const TIME_PERIODS = [];

		if (years_gap > DEFAULT_GAP) {
			TIME_PERIODS.push(`${years_gap} ${years_gap !== DEFAULT_LENGTH_CHECK ? 'years' : 'year'}`);
		}

		if (months_gap > DEFAULT_GAP) {
			TIME_PERIODS.push(`${months_gap} ${months_gap !== DEFAULT_LENGTH_CHECK ? 'months' : 'month'}`);
		}

		if (days_gap > DEFAULT_GAP) {
			TIME_PERIODS.push(`${days_gap} ${days_gap !== DEFAULT_LENGTH_CHECK ? 'days' : 'day'}`);
		}

		return TIME_PERIODS.join(', ');
	};

	return (
		<div className={styles.employee_details}>
			<div className={styles.img_container}>
				<img
					className={styles.avatar_img}
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/userAvatar.svg"
					alt="avtar"
				/>
			</div>
			<div className={styles.employee_name}>
				{name}
			</div>
			<div className={styles.designation}>
				{designation}
			</div>
			<div className={styles.detail_container} />
			{EMPLOYEE_DETAIL_MAPPING.map((val) => (
				<div className={styles.mb_16} key={val.key}>
					<div className={styles.detail_heading}>
						{val.heading}
						{' '}
						:
					</div>
					<div className={styles.item}>
						{val.func(data[val.key], val.startCase) || '-'}
					</div>
				</div>
			))}
			<div className={styles.mb_16}>
				<div className={styles.detail_heading}>
					Days from joining :
				</div>
				<div className={styles.item}>
					{getDiffDays()}
				</div>
			</div>
		</div>
	);
}

export default EmployeeDetails;
