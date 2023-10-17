import { IcMArrowNext, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const THINGS_TO_DO = [
	{
		src            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Money_view_green.svg',
		type           : 'Payroll',
		employee_count : '322 employees not paid',
	},
	{
		src            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Money_view_green.svg',
		type           : 'Leave Requests',
		employee_count : '322 employees not paid',
	},
	{
		src            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Money_view_green.svg',
		type           : 'Offboarding Requests',
		employee_count : '322 employees not paid',
	},
	{
		src            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Money_view_green.svg',
		type           : 'Reimbursements',
		employee_count : '322 employees not paid',
	},
];

const COMPARE_GROWTH = [
	{
		percentage : '119%',
		growth     : '3.46%',
		text       : 'Absents per month',
	},
	{
		percentage : '119%',
		growth     : '3.46%',
		text       : 'Total Offboardings',
	},
	{
		percentage : '119%',
		growth     : '3.46%',
		text       : 'Avg Tenure',
	},

];

function EmployeeStatusDetails() {
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
									style={{ width: 50, height: 50, marginRight: 14 }}
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
