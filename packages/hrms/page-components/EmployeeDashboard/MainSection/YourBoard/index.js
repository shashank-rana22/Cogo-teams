import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetHierarchyDetails from '../../../../hooks/useGetHierarchyDetails';

import AttendanceStats from './AttendanceStats';
import Holiday from './Holiday';
import LeaveBalance from './LeaveBalance';
import NotInOffice from './NotInOffice';
import OrgData from './OrgData';
import SalaryUpdate from './SalaryUpdate';
import styles from './styles.module.css';
import TimeSummary from './TimeSummary';
import YourTeam from './YourTeam';

function YourBoard({ data, loading }) {
	const {
		manager_detail, hrbp_detail, next_holiday_detail, self_working_stats,
		last_leave_taken, user_role,
	} = data || {};

	const { params, setParams, data : hierarchy, loading : hierarchyLoading } = useGetHierarchyDetails();

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				YOUR BOARD
			</div>
			<div className={styles.sub_heading}>
				At a glance view of important stuff
			</div>
			<OrgData manager_detail={manager_detail} hrbp_detail={hrbp_detail} loading={loading} />
			<TimeSummary />
			<NotInOffice data={data} loading={loading} />
			{user_role !== 'employee' && !isEmpty(hierarchy)
			&& <YourTeam data={hierarchy} params={params} setParams={setParams} loading={hierarchyLoading} />}
			<LeaveBalance />
			<SalaryUpdate data={data} />
			<AttendanceStats
				self_working_stats={self_working_stats}
				last_leave_taken={last_leave_taken}
				loading={loading}
			/>
			<Holiday data={next_holiday_detail} loading={loading} />
		</div>
	);
}

export default YourBoard;
