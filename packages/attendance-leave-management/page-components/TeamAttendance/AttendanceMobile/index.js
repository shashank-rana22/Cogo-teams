import { cl, CreatableSelect } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React, { useEffect } from 'react';

import { ATTENDANCE_LOGS_STATUS_MAPPING } from '../../../utils/constants';

import styles from './styles.module.css';

function AttendanceMobile({
	data,
	employeeValue,
	setEmployeeValue,
	daysAttendance,
	setDaysAttendance,
}) {
	const { attendanceDates = [], dataArr } = data || {};
	const filteredArray = [...(dataArr || [])]?.filter((item) => item !== null);

	const options = filteredArray.map((employee) => ({
		label : `${employee.employee_name} (${employee.employee_code})`,
		value : employee.employee_code,
	}));

	useEffect(() => {
		if (employeeValue !== '') {
			const currentEmployee = filteredArray.find((employee) => employee.employee_code === employeeValue);
			setDaysAttendance(currentEmployee.days);
		}
	}, [filteredArray, employeeValue, setDaysAttendance]);

	const GREEN_STATUS = ['present', 'holiday', 'sick_leave', 'privilege_leave', 'casual_leave',
		'half_day_sick_leave', 'half_day_privilege_leave', 'half_day_casual_leave'];

	const INVALID_STATUS = ['invalid'];

	const HALF_DAY_STATUS = ['half_day_absent', 'half_day_absent_sick_leave',
		'half_day_absent_privilege_leave', 'half_day_absent_casual_leave'];

	const WEEKLY_OFF = ['weekly_off'];

	const getClassName = (status, color) => {
		if (GREEN_STATUS.includes(status)) {
			return color ? 'present_color' : 'present';
		}

		if (INVALID_STATUS.includes(status)) {
			return color ? 'invalid_color' : 'invalid';
		}

		if (HALF_DAY_STATUS.includes(status)) {
			return color ? 'present_color' : 'hda';
		}

		if (WEEKLY_OFF.includes(status)) {
			return color ? 'weekly_off_color' : 'weekly_off';
		}

		return color ? 'absent_color' : 'absent';
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Employee Name</div>
			<CreatableSelect
				value={employeeValue}
				onChange={setEmployeeValue}
				placeholder="Select employee"
				options={options}
				className={styles.select}
			/>
			{(daysAttendance.length !== GLOBAL_CONSTANTS.zeroth_index)
            && (attendanceDates.length !== GLOBAL_CONSTANTS.zeroth_index)
            && (attendanceDates.map((date, index) => (
	<div
		className={styles.card}
		key={date.date}
		aria-hidden="true"
	>
		<div className={styles.attendance_date}>
			<div className={styles.attendance_day}>
				{date.day}
			</div>
			{formatDate({ date: date.date, dateFormat: GLOBAL_CONSTANTS.formats.date['MMM, dd'], formatType: 'date' })}
		</div>
		<div className={styles.attendance_time}>
			<div className={styles.attendance_day}>
				Check in & out
			</div>
			{formatDate({
				date       : daysAttendance[index]?.check_in,
				dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'time',
			})}
			{' '}
			-
			{' '}
			{formatDate({
				date       : daysAttendance[index]?.check_out,
				dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'time',
			})}
		</div>
		<div className={
			cl`${styles.attendance_status} 
			${styles[getClassName(daysAttendance[index]?.day_status, true)]}`
			}
		>
			<div className={cl`${styles.attendance_dot} ${styles[getClassName(daysAttendance[index]?.day_status)]}`} />
			{ATTENDANCE_LOGS_STATUS_MAPPING[daysAttendance[index]?.day_status]?.label}
		</div>
	</div>

            )))}
		</div>
	);
}

export default AttendanceMobile;
