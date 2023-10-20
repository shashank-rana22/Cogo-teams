import React from 'react';

import useGetDashboardSummary from '../../../../hooks/useGetDashboardSummary';

import AttendanceStats from './AttendanceStats';
import Holiday from './Holiday';
import LeaveBalance from './LeaveBalance';
import NotInOffice from './NotInOffice';
import OrgData from './OrgData';
// import SalaryUpdate from './SalaryUpdate';
import styles from './styles.module.css';
import TimeSummary from './TimeSummary';

function YourBoard() {
	const { data, loading } = useGetDashboardSummary();

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
			<AttendanceStats self_working_stats={self_working_stats} loading={loading} />
			<Holiday data={next_holiday_detail} loading={loading} />
			{/* <SalaryUpdate /> */}
		</div>
	);
}

export default YourBoard;
