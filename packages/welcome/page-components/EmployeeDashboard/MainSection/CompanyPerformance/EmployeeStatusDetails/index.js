import { IcMArrowNext, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmployeeStatusDetails({ task_list = {}, summaryData = {}, absentData = {} }) {
	const { leave_requests, offboarding_requests, payroll, reimbursements } = task_list || {};
	console.log('sumarryData', summaryData);
	const { monthly_insights } = summaryData || {};

	const { age, offboardings, tenure } = monthly_insights || {};

	const COMPARE_GROWTH = [
		{
			percentage : `${Math.round((absentData?.curr_month_absent || 0) * 100) / 100}%`,
			growth     : `${Math.round((absentData?.growth || 0) * 100) / 100}%`,
			text       : 'Absents per month',
		},
		{
			percentage : `${Math.round((offboardings?.curr_month_offboardings || 0) * 100) / 100}%`,
			growth     : `${Math.round((offboardings?.growth || 0) * 100) / 100}%`,
			text       : 'Total Offboardings',
		},
		{
			percentage : `${Math.round((tenure?.curr_month || 0) * 100) / 100}%`,
			growth     : `${Math.round((tenure?.growth || 0) * 100) / 100}%`,
			text       : 'Avg Tenure',
		},
		{
			percentage : `${Math.round((age?.curr_month || 0) * 100) / 100}%`,
			growth     : `${Math.round((offboardings?.growth || 0) * 100) / 100}%`,
			text       : 'Avg Employee Age',
		},
	];

	const THINGS_TO_DO = [
		{
			src            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Money_view_green.svg',
			type           : 'Payroll',
			employee_count : `${payroll} employees not paid`,
		},
		{
			src            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/CalendWBack.png',
			type           : 'Leave Requests',
			employee_count : `${leave_requests} pending`,
		},
		{
			src            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/profileWBack.png',
			type           : 'Offboarding Requests',
			employee_count : `${offboarding_requests} pending`,
		},
		{
			src            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/docWBack.png',
			type           : 'Reimbursements',
			employee_count : `${reimbursements} pending`,
		},
	];
	return (
		<div className={styles.employee_status_details}>
			<div className={styles.employee_status_compare}>

				{COMPARE_GROWTH.map((item) => (
					<div className={styles.employee_status_card} key={item?.text}>
						<div className={styles.employee_status_content} key={item?.text}>
							<div className={styles.card__title}>
								<span className={styles.percentage}>{item?.percentage}</span>
								<span className={styles.growth}>
									<IcMArrowNext style={{ transform: 'rotate(-45deg)' }} />
									{item?.growth}
								</span>
								{' '}

							</div>
							<div className={styles.card_legend}>{item?.text}</div>
						</div>
					</div>
				))}

			</div>
			<div className={styles.employee_to_do}>
				<div className={styles.employee_things_to_do}>
					<span>Things to do</span>
				</div>
				<div className={styles.listed_things}>
					{(THINGS_TO_DO || []).map((item) => (
						<div className={styles.listed_item} key={item.type}>
							<div className={styles.listed_item_left}>
								<img
									src={item?.src}
									alt=""
									style={{ width: 40, height: 40, marginRight: 14 }}
								/>
								<div>
									<div className={styles.listed_item_left_heading}>{item?.type}</div>
									<div className={styles.listed_item_left_subheading}>{item.employee_count}</div>
								</div>
							</div>
							<div className={styles.listed_item_right}>
								{' '}
								<IcMArrowRight style={{ width: 20, height: 20 }} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default EmployeeStatusDetails;
