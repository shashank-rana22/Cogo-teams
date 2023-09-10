import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import EmploymentStatus from './EmploymentStatus';
import styles from './styles.module.css';

function EmploymentDetails({ data = {} }) {
	const info = [
		{
			heading : 'BASIC DETAILS',
			details : [
				{ label: 'Employee Code', key: 'details', value: 'employee_code' },
				{ label: 'Employment Type', key: 'details', value: 'employee_type' },
				{ label: 'Joining Date', key: 'details', value: 'date_of_joining' },
				{ label: 'Age in Organization', key: 'processed', value: 'age_in_organization' },
			],
		},
		{
			heading : 'JOB  INFORMATION',
			details : [
				{ label: 'Branch Location', key: 'details', value: 'office_location' },
				{ label: 'Department', key: 'details', value: 'department' },
				{ label: 'Role', key: 'details', value: 'role_name' },
				{ label: 'Designation', key: 'details', value: 'designation' },
				{ label: 'Reporting Supervisor', key: 'details', value: 'reporting_manager_name' },
				{ label: 'HRBP', key: 'details', value: 'hrbp_name' },
				{ label: 'Job Segment', key: 'details', value: 'job_segment' },
				{ label: 'PMS', key: 'details', value: 'Set C' },
			],
		},
	];

	const otherInfo = [
		{ label: 'Employment Type', key: 'details', value: 'employee_type' },
		{ label: 'Reports To', key: 'details', value: 'reporting_manager_name' },
		{ label: 'HRBP', key: 'details', value: 'hrbp_name' },
		{ label: 'Employee Code', key: 'details', value: 'employee_code' },
	];

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>EMPLOYMENT DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				<div className={styles.info_container}>
					{info.map(({ heading, details }, index) => {
						if (index === GLOBAL_CONSTANTS.zeroth_index) {
							return (
								<>
									<DetailsCard heading={heading} details={details} key={heading} data={data} />
									<EmploymentStatus data={data} />
								</>
							);
						}
						return (
							<DetailsCard heading={heading} details={details} key={heading} data={data} />
						);
					})}
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} data={data} />
		</div>
	);
}

export default EmploymentDetails;
