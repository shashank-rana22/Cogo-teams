import React from 'react';

// import EmptyState from '../../../common/EmptyState';

import styles from './styles.module.css';

const attendanceDates = [
	{ date: 'Aug 06 2023', day: 'Sunday' },
	{ date: 'Aug 07 2023', day: 'Monday' },
	{ date: 'Aug 08 2023', day: 'Tuesday' },
	{ date: 'Aug 09 2023', day: 'Wednesday' },
	{ date: 'Aug 10 2023', day: 'Thursday' },
	{ date: 'Aug 11 2023', day: 'Friday' },
	{ date: 'Aug 12 2023', day: 'Saturday' },
];

const dataArr = [
	{
		employee_name : 'John Doe',
		employee_code : 'ABC0101',
		designation   : 'Software Engineer',
		days          : [
			{
				day_status : 'Weekly Off',
				check_in   : '00:00',
				checkout   : '00:00',
			},
			{
				day_status : 'Present',
				check_in   : '10:30',
				checkout   : '07:30',
			},
			{
				day_status : 'Absent',
				check_in   : '10:30',
				checkout   : '07:30',
			},
			{
				day_status : 'Present',
				check_in   : '10:30',
				checkout   : '07:30',
			},
			{
				day_status : 'Present',
				check_in   : '10:30',
				checkout   : '09:30',
			},
			{
				day_status : 'Present',
				check_in   : '09:30',
				checkout   : '08:30',
			},
			{
				day_status : 'Weekly Off',
				check_in   : '00:00',
				checkout   : '00:00',
			},
		],
	},
	{
		employee_name : 'Jane Smith',
		employee_code : 'DEF0202',
		designation   : 'Product Manager',
		days          : [
			{
				day_status : 'Present',
				check_in   : '09:00',
				checkout   : '18:00',
			},
			{
				day_status : 'Present',
				check_in   : '09:30',
				checkout   : '18:30',
			},
			{
				day_status : 'Absent',
				check_in   : '10:00',
				checkout   : '18:00',
			},
			{
				day_status : 'Present',
				check_in   : '09:15',
				checkout   : '18:15',
			},
			{
				day_status : 'Present',
				check_in   : '09:10',
				checkout   : '18:10',
			},
			{
				day_status : 'Weekly Off',
				check_in   : '00:00',
				checkout   : '00:00',
			},
			{
				day_status : 'Weekly Off',
				check_in   : '00:00',
				checkout   : '00:00',
			},
		],
	},
	{
		employee_name : 'Michael Johnson',
		employee_code : 'GHI0303',
		designation   : 'UI/UX Designer',
		days          : [
			{
				day_status : 'Present',
				check_in   : '09:00',
				checkout   : '18:00',
			},
			{
				day_status : 'Present',
				check_in   : '09:30',
				checkout   : '18:30',
			},
			{
				day_status : 'Absent',
				check_in   : '10:00',
				checkout   : '18:00',
			},
			{
				day_status : 'Present',
				check_in   : '09:15',
				checkout   : '18:15',
			},
			{
				day_status : 'Present',
				check_in   : '09:10',
				checkout   : '18:10',
			},
			{
				day_status : 'Weekly Off',
				check_in   : '00:00',
				checkout   : '00:00',
			},
			{
				day_status : 'Weekly Off',
				check_in   : '00:00',
				checkout   : '00:00',
			},
		],
	},
	{
		employee_name : 'Emily Brown',
		employee_code : 'JKL0404',
		designation   : 'Marketing Specialist',
		days          : [
			{
				day_status : 'Present',
				check_in   : '09:00',
				checkout   : '18:00',
			},
			{
				day_status : 'Present',
				check_in   : '09:30',
				checkout   : '18:30',
			},
			{
				day_status : 'Absent',
				check_in   : '10:00',
				checkout   : '18:00',
			},
			{
				day_status : 'Present',
				check_in   : '09:15',
				checkout   : '18:15',
			},
			{
				day_status : 'Present',
				check_in   : '09:10',
				checkout   : '18:10',
			},
			{
				day_status : 'Weekly Off',
				check_in   : '00:00',
				checkout   : '00:00',
			},
			{
				day_status : 'Weekly Off',
				check_in   : '00:00',
				checkout   : '00:00',
			},
		],
	},
	{
		employee_name : 'David Williams',
		employee_code : 'MNO0505',
		designation   : 'Data Analyst',
		days          : [
			{
				day_status : 'Present',
				check_in   : '09:00',
				checkout   : '18:00',
			},
			{
				day_status : 'Present',
				check_in   : '09:30',
				checkout   : '18:30',
			},
			{
				day_status : 'Absent',
				check_in   : '10:00',
				checkout   : '18:00',
			},
			{
				day_status : 'Present',
				check_in   : '09:15',
				checkout   : '18:15',
			},
			{
				day_status : 'Present',
				check_in   : '09:10',
				checkout   : '18:10',
			},
			{
				day_status : 'Weekly Off',
				check_in   : '00:00',
				checkout   : '00:00',
			},
			{
				day_status : 'Weekly Off',
				check_in   : '00:00',
				checkout   : '00:00',
			},
		],
	},
];

// if (isEmpty(data) && !loading) {
// 	return (
// 		<div style={{ paddingTop: 6, paddingLeft: 6 }}>
// 			<EmptyState emptyText={emptyText} />
// 		</div>
// 	);
// }

function AttendanceData() {
	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.header_employee_name}>
					Employee Name
				</div>
				{attendanceDates.map((val) => (
					<div key={val.day} className={styles.attendance_date}>
						<div>
							{val.date}
						</div>
						<div style={{ fontSize: 12 }}>
							{val.day}
						</div>
					</div>
				))}
			</div>

			{dataArr.map((val, index) => (
				<div className={styles.attendace_time_container} key={val.employee_code}>
					<div className={styles.employee_name}>
						{val.employee_name}
						{' '}
						(
						{val.employee_code}
						)
						<div style={{ fontSize: 12 }}>
							Marketing
						</div>
					</div>

					{val.days.map((item) => (
						<div className={styles.attendance_date} key={`${index + index}`}>
							<div style={{ fontWeight: 600 }}>
								{item.day_status}
							</div>
							<div style={{ fontSize: 12 }}>
								{item.check_in}
								{' '}
								-
								{' '}
								{item.checkout}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default AttendanceData;
