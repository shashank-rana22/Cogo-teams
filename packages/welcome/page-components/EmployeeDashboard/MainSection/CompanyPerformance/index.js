import { Toggle } from '@cogoport/components';
import { IcCGreenCircle } from '@cogoport/icons-react';
import React from 'react';

import useGetAbsenteeInsight from '../../../../hooks/useGetAbsenteeInsight';
import useGetDepartmentRatings from '../../../../hooks/useGetDepartmentRatings';
import useGetDepartmentWise from '../../../../hooks/useGetDepartmentWise';

import CompanyLeaderBoard from './CompanyLeaderBoard';
import DepartmentTracking from './DepartmentTracking';
import EmployeeStatusDetails from './EmployeeStatusDetails';
import IndividualActivity from './IndividualActivity';
import styles from './styles.module.css';
import TeamLeaderBoard from './TeamLeaderBoard';

function CompanyPerformance({
	summaryData = {},
	setIsEmployeeDashboardActive,
	isEmployeeDashboardActive,
}) {
	const { data } = useGetDepartmentRatings();

	const { absentee_list, employees_list, task_list } = summaryData || {};

	const present_list = ((employees_list || []).length) - ((absentee_list || []).length);

	const { data:absentData } = useGetAbsenteeInsight();

	const { data:depDetails, getDepartmentWise, setFilters, filters } = useGetDepartmentWise();

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div>
					<div className={styles.title}>
						Company Performance
					</div>
					<div className={styles.sub_title}>
						View how your team is doing
					</div>
				</div>

				<div className={styles.performance_company}>
					<Toggle
						name="a1"
						size="sm"
						checked={isEmployeeDashboardActive}
						onChange={(e) => setIsEmployeeDashboardActive(e.target.checked)}
						onLabel="Company"
						offLabel="Employee"
					/>
				</div>
			</div>
			<div className={styles.employee_flex}>
				<div className={styles.employee_data}>
					<div className={styles.employee_abs}>
						<div className={styles.employee_abs_title}>
							Total Employees
						</div>
						<div className={styles.employee_tot_count}>
							{(employees_list || []).length}
						</div>
						<div className={styles.present_count}>
							<IcCGreenCircle style={{ marginRight: '4px' }} />
							{present_list}
							{' '}
							Present today
						</div>
						<div className={styles.employee_abs_img}>
							<img
								alt="kpi-img"
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Saly-10.png"
							/>
						</div>
					</div>
				</div>
				<div className={styles.department_data}>
					<IndividualActivity data={summaryData} />
				</div>
			</div>
			<EmployeeStatusDetails task_list={task_list} summaryData={summaryData} absentData={absentData} />
			<DepartmentTracking
				depDetails={depDetails}
				getDepartmentWise={getDepartmentWise}
				summaryData={summaryData}
				setFilters={setFilters}
				filters={filters}
			/>
			<div className={styles.bottom_bar_data}>
				<CompanyLeaderBoard data={data?.department_wise || []} />
				<div className={styles.team_leaderboard}>
					<TeamLeaderBoard data={data?.squad_wise || []} />
				</div>
			</div>
		</div>
	);
}

export default CompanyPerformance;
