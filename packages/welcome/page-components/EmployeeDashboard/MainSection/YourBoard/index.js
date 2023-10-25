import React from 'react';

import AttendanceStats from './AttendanceStats';
import Holiday from './Holiday';
import LeaveBalance from './LeaveBalance';
import NotInOffice from './NotInOffice';
import OrgData from './OrgData';
import SalaryUpdate from './SalaryUpdate';
import styles from './styles.module.css';
import TimeSummary from './TimeSummary';

function YourBoard({ data, loading }) {
	const { manager_name, hrbp_name, next_holiday_detail, self_working_stats } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				YOUR BOARD
			</div>
			<div className={styles.sub_heading}>
				At a glance view of important stuff
			</div>
			<OrgData manager_name={manager_name} hrbp_name={hrbp_name} loading={loading} />
			<TimeSummary />
			<NotInOffice data={data} loading={loading} />
			<LeaveBalance />
			<SalaryUpdate />
			<AttendanceStats self_working_stats={self_working_stats} loading={loading} />
			<Holiday data={next_holiday_detail} loading={loading} />
		</div>
	);
}

export default YourBoard;
