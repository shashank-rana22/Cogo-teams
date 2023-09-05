import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import { ATTENDANCE_LOGS_STATUS_MAPPING } from '../../../utils/constants';

import styles from './styles.module.css';

function AttendanceData({ data = {} }) {
	const { attendanceDates, dataArr } = data || {};

	const filteredArray = [...(dataArr || [])]?.filter((item) => item !== null);

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.header_employee_name}>
					Employee Name
				</div>
				{(attendanceDates || []).map((val) => (
					<div key={val.day} className={styles.header_attendance_date}>
						<div className={styles.fw_500}>
							{formatDate({
								date       : val.date,
								dateFormat : GLOBAL_CONSTANTS.formats.date['MMM dd yyyy'],
								formatType : 'date',
							})}
						</div>
						<div style={{ fontSize: 12 }}>
							{val.day}
						</div>
					</div>
				))}
			</div>

			{(filteredArray || []).map((val) => (
				<div className={styles.attendace_time_container} key={val.employee_code}>
					<div className={styles.employee_name}>
						{val.employee_name}
						{' '}
						(
						{val.employee_code}
						)
						<div style={{ fontSize: 12 }}>
							{val.designation}
						</div>
					</div>

					{(val.days || []).map((item, index) => (
						<div
							key={`${item.check_in}_${val.day_status}_${index + GLOBAL_CONSTANTS.zeroth_index}`}
							className={cl`${styles.attendance_date} 
							${styles[ATTENDANCE_LOGS_STATUS_MAPPING[item.day_status]?.className]}`}
						>
							<div style={{ fontWeight: 500 }}>
								{ ATTENDANCE_LOGS_STATUS_MAPPING[item.day_status]?.label || '--'}
							</div>
							<div style={{ fontSize: 10 }}>
								{formatDate({
									date       : item.check_in,
									dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
									formatType : 'time',
								})}
								{' '}
								-
								{' '}
								{formatDate({
									date       : item.check_out,
									dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
									formatType : 'time',
								})}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default AttendanceData;
