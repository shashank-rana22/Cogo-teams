import { Select } from '@cogoport/components';
import { IcCGreenCircle, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import Feed from '../Feed';

import DepartmentHappyIndex from './DepartmentHappyIndex';
import DepartmentTracking from './DepartmentTracking';
import EmployeeStatusDetails from './EmployeeStatusDetails';
import styles from './styles.module.css';
// import WorkingHrs from './WorkingHrs';

// https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Rectangle_126.svg
const options = [
	{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
];

function CompanyPerformance() {
	return (
		<>
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
						<div style={{ padding: 16, width: 'fit-content' }}>
							<Select placeholder="Select value" options={options} />
						</div>
					</div>
				</div>
				<div className={styles.employee_flex}>
					<div className={styles.employee_data}>
						<div className={styles.employee_abs}>
							<div className={styles.employee_abs_title}>
								Total Employees (Dept)
							</div>
							<div className={styles.employee_tot_count}>
								350
							</div>
							<div className={styles.present_count}>
								<IcCGreenCircle style={{ marginRight: '4px' }} />
								323 Present today
							</div>
							<div className={styles.view_abs_flex}>
								View Absents
								{' '}
								<IcMArrowRight width={12} height={12} style={{ marginLeft: 2 }} />
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
						<DepartmentHappyIndex />
					</div>
				</div>
				<EmployeeStatusDetails />
				<DepartmentTracking />
			</div>
			<div className={styles.company_feed}>
				<div className={styles.company_feed_title}>
					Company Feed
				</div>
				<div className={styles.sub_title}>
					Updates, announcements and more
				</div>
				<Feed />
			</div>
		</>
	);
}

export default CompanyPerformance;
