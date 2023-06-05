import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const CTC_BREAK_MAPPING = ['basic', 'hra', 'conveyance_allowance',
	'special_allowance', 'food_allowance', 'fuel_allowance',
	'telephone_allowance', 'annual_base', 'lta', 'medical_reimbursement',
	'flexible_benefits', 'provident_fund', 'gratuity', 'medical_policy', 'retirals',
	'variable_component', 'sub_total_monthly_gross', 'statutory_bonus', 'annual_gross_salary',
	'incentives', 'total_targeted_compensation_no_retention', 'total_targeted_compensation',
	'monthly_in_hand_without_tds'];

function CtcBreakup({ metadata }) {
	const {
		joining_bonus_yearly,
		joining_bonus_monthly,
		performance_linked_variable_yearly,
		performance_linked_variable_monthly,
		retention_bonus_yearly,
		retention_bonus_monthly,
		sign_on_bonus_monthly,
		sign_on_bonus_yearly,
	} = metadata;
	const MAPPING = {
		joining_bonus_monthly: {
			heading      : 'Joining Bonus',
			yearlyValue  : joining_bonus_yearly,
			monthlyValue : joining_bonus_monthly,
		},
		performance_linked_variable_monthly: {
			heading      : 'Performance Variable',
			yearlyValue  : performance_linked_variable_yearly,
			monthlyValue : performance_linked_variable_monthly,
		},
		retention_bonus_monthly: {
			heading      : 'Retention Bonus',
			yearlyValue  : retention_bonus_yearly,
			monthlyValue : retention_bonus_monthly,
		},
		sign_on_bonus_monthly: {
			heading      : 'Sign On Bonus',
			yearlyValue  : sign_on_bonus_yearly,
			monthlyValue : sign_on_bonus_monthly,
		},
	};
	return (
		<div className={styles.table_container}>
			<div className={styles.heading}>
				<h4 style={{ width: '60%' }}>Components</h4>
				<h4 style={{ width: '20%' }}>Annual Salary</h4>
				<h4 style={{ width: '20%' }}>Monthly Salary</h4>
			</div>

			{CTC_BREAK_MAPPING.map((key) => {
				console.log('metadata[key]', metadata[key]);

      	const {
      		heading = null,
      		yearlyValue = null,
      		monthlyValue = null,
      	} = value;
      	return (
	<div key={key}>
		{heading != null ? (
			<div className={styles.list} key={key}>
				{heading ? (
					<div style={{ width: '60%' }}>
						{startCase(heading ?? '______')}

					</div>
				) : null}
				{yearlyValue != null ? (
					<div style={{ width: '20%' }}>
						{Number(yearlyValue || 0).toFixed(2) ?? '______'}
					</div>
				) : null}
				{monthlyValue != null ? (
					<div style={{ width: '20%' }}>
						{Number(monthlyValue || 0).toFixed(2) ?? '______'}
					</div>
				) : null}
			</div>
		) : (
			<div className={styles.list} key={key}>
				<div style={{ width: '60%' }}>
					{startCase(MAPPING?.[key]?.heading ?? '______')}
				</div>
				<div style={{ width: '20%' }}>
					{MAPPING?.[key]?.yearlyValue ?? '______'}
				</div>
				<div style={{ width: '20%' }}>
					{MAPPING?.[key]?.monthlyValue ?? '______'}
				</div>
			</div>
		)}
	</div>
      	);
			})}
		</div>
	);
}

export default CtcBreakup;
