import React from 'react';

import AttendanceStats from './AttendanceStats';
import Holiday from './Holiday';
import LeaveBalance from './LeaveBalance';
import NotInOffice from './NotInOffice';
import OrgData from './OrgData';
import SalaryUpdate from './SalaryUpdate';
import styles from './styles.module.css';
import TimeSummary from './TimeSummary';

function YourBoard() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				YOUR BOARD
			</div>
			<div className={styles.sub_heading}>
				At a glance view of important stuff
			</div>
			<TimeSummary />
			<NotInOffice />
			<LeaveBalance />
			<AttendanceStats />
			<Holiday />
			<SalaryUpdate />
			<OrgData />
		</div>
	);
}

export default YourBoard;
