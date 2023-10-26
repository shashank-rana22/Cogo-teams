import { IcMArrowNext, IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
// import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function EmployeeStatusDetails({ task_list = {}, summaryData = {}, absentData = {} }) {
	const { leave_requests, offboarding_requests, payroll, reimbursements } = task_list || {};
	console.log('sumarryData', task_list);
	const { monthly_insights } = summaryData || {};
	// const { push } = useRouter();

	const { age, offboardings, tenure } = monthly_insights || {};

	const { push } = useRouter();

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
			src:
			'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/moneyDollar.svg',
			type           : 'Payroll',
			employee_count : `${payroll} employees not paid`,
			target         : '/payroll',
		},
		{
			src:
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/ce7894a168aed5c5b6b42e5ba1ab4b60/Calendar.svg',
			type           : 'Leave Requests',
			employee_count : `${leave_requests} pending`,
			target         : '/attendance-leave-management?showInbox=true',
		},
		{
			src:
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/b4501a1989c19715142a2095d65b777e/Calendar-2.svg',
			type           : 'Offboarding Requests',
			employee_count : `${offboarding_requests} pending`,
			target         : '/attendance-leave-management?showInbox=true',
		},
		{
			src:
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/1a9f21c2f03f299fdc0161416530ed14/Calendar-3.svg',
			type           : 'Reimbursements',
			employee_count : `${reimbursements?.pending_count} pending`,
			target         : '/attendance-leave-management?showInbox=true',
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
									<IcMArrowNext style={{
										alignContent : 'center',
										transform    : item?.growth < 0 ? 'rotate(45deg)' : 'rotate(-45deg)',
										color        : item?.growth < 0 ? 'red' : '#849e4c',
										marginLeft   : '4px',
									}}
									/>
									<span style={{ color: item?.growth < 0 ? 'red' : '#849e4c' }}>
										{item?.growth}
									</span>

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
								<IcMArrowRight
									style={{ width: 20, height: 20 }}
									onClick={() => push(item?.target)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default EmployeeStatusDetails;
