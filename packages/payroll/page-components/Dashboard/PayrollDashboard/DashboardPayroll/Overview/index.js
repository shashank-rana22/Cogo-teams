import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isNumber } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const ARROW_RIGHT_TOP = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/arrow-top-right.svg';
// const CALENDAR = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Frame_1564.svg';
const PROFILE_ICON = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/profile_view.svg';
const MONEY_VIEW = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Money_view.svg';
const MONEY_VIEW_GREEN = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Money_view_green.svg';
const TWO = GLOBAL_CONSTANTS.two;

function Overview({ payrollOverView = {} }) {
	const { active_employees_data, gross_salary, net_salary } = payrollOverView || {};
	const { active_employees, rate_of_change } = active_employees_data || {};
	const { total_gross_salary, rate_of_change: gross_change } = gross_salary || {};
	const { total_net_salary, rate_of_change: net_change } = net_salary || {};
	return (
		<div className={styles.content_overview}>
			<div className={styles.top_overview}>
				<div className={styles.overview_text}>
					Overview
				</div>
				<div className={styles.overview_text}>
					PAYROLL DATE - 21ST EVERY MONTH
				</div>
			</div>
			<div className={styles.overview_cards}>
				<div className={styles.overview_card}>
					<div className={styles.card_item}>
						<div className={styles.profile_img}>
							<img src={PROFILE_ICON} alt="PROFILE_ICON" />
						</div>
						<div className={styles.active_employees}>
							<span className={styles.active_count}>
								{active_employees}
							</span>
							<span className={styles.active_text}>Active Employees</span>
						</div>
					</div>
					{parseFloat(rate_of_change)
					< GLOBAL_CONSTANTS.zeroth_index ? (
						<div className={styles.icon_arrow_down}>
							<IcMArrowNext className={styles.arrow_icon_down} />
							{isNumber(parseFloat(rate_of_change)) ? parseFloat(rate_of_change).toFixed(TWO) : '-'}
							{' '}
							%
							<span className={styles.compare_month}> vs last month</span>
						</div>
						) : (
							<div className={styles.icon_arrow_up}>
								<img src={ARROW_RIGHT_TOP} alt="Arrow_Top_Right" />
								{isNumber(parseFloat(rate_of_change)) ? parseFloat(rate_of_change).toFixed(TWO) : '-'}
								{' '}
								%
								<span className={styles.compare_month}> vs last month</span>
							</div>
						)}
				</div>
				{/* <div className={styles.overview_card}>
					<div className={styles.card_item}>
						<div className={styles.profile_img}>
							<img src={CALENDAR} alt="CALENDAR" />
						</div>
						<div className={styles.active_employees}>
							<span className={styles.active_count}>{AVG_WORKING_DAY}</span>
							<span className={styles.active_text}>Avg Working Day</span>
						</div>
					</div>
					{DOWN_GRADE ? (
						<div className={styles.icon_arrow_down}>
							<IcMArrowNext className={styles.arrow_icon_down} />
							{RATING}
							<span className={styles.compare_month}> vs last month</span>
						</div>
					) : (
						<div className={styles.icon_arrow_up}>
							<img src={ARROW_RIGHT_TOP} alt="Arrow_Top_Right" />
							{RATING}
							<span className={styles.compare_month}> vs last month</span>
						</div>
					)}
				</div> */}
				<div className={styles.overview_card}>
					<div className={styles.card_item}>
						<div className={styles.profile_img}>
							<img src={MONEY_VIEW} alt="MONEY_VIEW" />
						</div>
						<div className={styles.active_employees}>
							<span className={styles.active_count}>
								₹
								{' '}
								{total_gross_salary}
							</span>
							<span className={styles.active_text}>GROSS SALARY</span>
						</div>
					</div>
					{parseFloat(gross_change) < GLOBAL_CONSTANTS.zeroth_index ? (
						<div className={styles.icon_arrow_down}>
							<IcMArrowNext className={styles.arrow_icon_down} />
							{parseFloat(gross_change).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}> vs last month</span>
						</div>
					) : (
						<div className={styles.icon_arrow_up}>
							<img src={ARROW_RIGHT_TOP} alt="Arrow_Top_Right" />
							{parseFloat(gross_change).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}> vs last month</span>
						</div>
					)}
				</div>
				<div className={styles.overview_card}>
					<div className={styles.card_item}>
						<div className={styles.profile_img}>
							<img src={MONEY_VIEW_GREEN} alt="MONEY_VIEW_GREEN" />
						</div>
						<div className={styles.active_employees}>
							<span className={styles.active_count}>
								₹
								{' '}
								{total_net_salary}
							</span>
							<span className={styles.active_text}>NET PAY</span>
						</div>
					</div>
					{parseFloat(net_change) < GLOBAL_CONSTANTS.zeroth_index ? (
						<div className={styles.icon_arrow_down}>
							<IcMArrowNext className={styles.arrow_icon_down} />
							{parseFloat(net_change).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}> vs last month</span>
						</div>
					) : (
						<div className={styles.icon_arrow_up}>
							<img src={ARROW_RIGHT_TOP} alt="Arrow_Top_Right" />
							{parseFloat(net_change).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}> vs last month</span>
						</div>
					)}
				</div>

			</div>

		</div>
	);
}

export default Overview;
