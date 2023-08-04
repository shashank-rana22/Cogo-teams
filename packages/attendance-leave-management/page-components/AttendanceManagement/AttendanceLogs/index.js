import { Select } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../common/StyledTable';
import useGetAttendanceColumns from '../../../common/useGetAttendanceColumns';

import styles from './styles.module.css';

const OPTIONS = [
	{ label: 'January 2023', value: 'january' },
	{ label: 'February 2023', value: 'february' },
	{ label: 'March 2023', value: 'march' },
	{ label: 'January 2023', value: 'january' },
	{ label: 'February 2023', value: 'february' },
	{ label: 'March 2023', value: 'march' },
	{ label: 'January 2023', value: 'january' },
	{ label: 'February 2023', value: 'february' },
	{ label: 'March 2023', value: 'march' },
	{ label: 'January 2023', value: 'january' },
	{ label: 'February 2023', value: 'february' },
	{ label: 'March 2023', value: 'march' },
];

const dataArr = [
	{
		date      : '01 May 2023',
		checkin   : '2023-05-01T09:30:00.000Z',
		checkout  : '2023-05-01T20:30:00.000Z',
		total_hrs : '9:12 hrs',
		extra_hrs : '23 minutes',
	},
	{
		date      : '02 May 2023',
		checkin   : '2023-05-02T10:00:00.000Z',
		checkout  : '2023-05-02T21:00:00.000Z',
		total_hrs : '9:12 hrs',
		extra_hrs : '3 hrs',
	},
	{
		date      : '03 May 2023',
		checkin   : '2023-05-03T09:30:00.000Z',
		checkout  : '2023-05-03T18:42:00.000Z',
		total_hrs : '9:12 hrs',
		extra_hrs : '0 minutes',
	},
	{
		date      : '04 May 2023',
		checkin   : '2023-05-04T09:15:00.000Z',
		checkout  : '2023-05-04T18:27:00.000Z',
		total_hrs : '9:12 hrs',
		extra_hrs : '0 minutes',
	},
	{
		date      : '05 May 2023',
		checkin   : '2023-05-05T08:55:00.000Z',
		checkout  : '2023-05-05T18:07:00.000Z',
		total_hrs : '9:12 hrs',
		extra_hrs : '10 minutes',
	},
	{
		date      : '06 May 2023',
		checkin   : '2023-05-06T10:30:00.000Z',
		checkout  : '2023-05-06T19:42:00.000Z',
		total_hrs : '9:12 hrs',
		extra_hrs : '1 hr 15 minutes',
	},
	{
		date      : '07 May 2023',
		checkin   : '2023-05-07T09:20:00.000Z',
		checkout  : '2023-05-07T18:32:00.000Z',
		total_hrs : '9:12 hrs',
		extra_hrs : '30 minutes',
	},
	{
		date      : '08 May 2023',
		checkin   : '2023-05-08T08:45:00.000Z',
		checkout  : '2023-05-08T18:57:00.000Z',
		total_hrs : '9:12 hrs',
		extra_hrs : '20 minutes',
	},
	{
		date      : '09 May 2023',
		checkin   : '2023-05-09T10:15:00.000Z',
		checkout  : '2023-05-09T19:27:00.000Z',
		total_hrs : '9:12 hrs',
		extra_hrs : '0 minutes',
	},
	{
		date      : '10 May 2023',
		checkin   : '2023-05-10T09:05:00.000Z',
		checkout  : '2023-05-10T18:17:00.000Z',
		total_hrs : '9:12 hrs',
		extra_hrs : '45 minutes',
	},
];

console.log(dataArr);

function AttendanceLogs() {
	const columns = useGetAttendanceColumns();
	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div>
					<div className={styles.title}>
						ATTENDANCE LOGS
					</div>
					<div className={styles.sub_title}>
						Logs for the month of March
					</div>
				</div>
				<div className={styles.select_wrapper}>
					<Select
						placeholder="Select Month"
						options={OPTIONS}
						// onChange={(item) => setSelectMonth(item)}
						// value={selectMonth}
					/>
				</div>
			</div>
			<div className={styles.table_container}>
				<StyledTable columns={columns} data={dataArr} />
			</div>
		</div>
	);
}

export default AttendanceLogs;
