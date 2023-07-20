import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { EMPLOYEE_DETAIL_MAPPING } from '../../../configurations/employeeDetailMapping';
import useGetEmployeeData from '../../../hooks/useGetEmployeeData';

import styles from './styles.module.css';

const DEFAULT_GAP = 0;
const DEFAULT_LENGTH_CHECK = 0;
const ARRAY_LENGTH = 5;

const getDiffDays = ({ years_gap, months_gap, days_gap }) => {
	const TIME_PERIODS = [];

	if (years_gap > DEFAULT_GAP) {
		TIME_PERIODS.push(`${years_gap} ${years_gap !== DEFAULT_LENGTH_CHECK ? 'years' : 'year'}`);
	}

	if (months_gap > DEFAULT_GAP) {
		TIME_PERIODS.push(`${months_gap} ${years_gap !== DEFAULT_LENGTH_CHECK ? 'months' : 'month'}`);
	}

	if (days_gap > DEFAULT_GAP) {
		TIME_PERIODS.push(`${days_gap} ${days_gap !== DEFAULT_LENGTH_CHECK ? 'days' : 'day'}`);
	}

	return TIME_PERIODS.join(', ');
};

const getDetail = (item, showStartCase = false) => {
	if (showStartCase) {
		return startCase(item);
	}

	return item;
};

function EmployeeDetails() {
	const { data, loading } = useGetEmployeeData();

	const { diff_in_days, name, designation } = data || {};

	const { months_gap, days_gap, years_gap } = diff_in_days || {};

	if (loading) {
		return (
			<div className={styles.placeholder_container}>
				<Placeholder type="circle" radius="100px" margin="0px 0px 30px 0px" />
				{[...Array(ARRAY_LENGTH)]
					.map((_, index) => (
						<Placeholder
							key={`${index + ARRAY_LENGTH}`}
							height="20px"
							width="100%"
							margin="0px 0px 20px 0px"
						/>
					))}
			</div>
		);
	}

	return (
		<div className={styles.employee_details}>
			<div className={styles.img_container}>
				<img
					className={styles.avatar_img}
					src={GLOBAL_CONSTANTS.image_url.empty_data}
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
						{getDetail(data?.[val.key || ''], val.startCase) || '-'}
					</div>
				</div>
			))}
			<div className={styles.mb_16}>
				<div className={styles.detail_heading}>
					Days from joining :
				</div>
				<div className={styles.item}>
					{getDiffDays({ years_gap, months_gap, days_gap })}
				</div>
			</div>
		</div>
	);
}

export default EmployeeDetails;
