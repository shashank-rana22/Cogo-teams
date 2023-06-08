import { startCase } from '@cogoport/utils';
import React from 'react';

import { CTC_BREAK_MAPPING } from '../../../commons/ctcbreakMapping';

import styles from './styles.module.css';

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
				const {
					heading = null,
					yearlyValue = null,
					monthlyValue = null,
				} = metadata[key] || {};

				return (
					<div key={key}>
						{heading != null ? (
							<div className={styles.list} key={key}>
								{heading ? (
									<div style={{ width: '60%' }}>
										{startCase(heading ?? '___')}

									</div>
								) : null}
								<div style={{ width: '20%' }}>
									{yearlyValue != null ? (

										<div>{Number(yearlyValue || 0).toFixed(2) ?? '___'}</div>

									) : null}
								</div>
								{monthlyValue != null ? (
									<div style={{ width: '20%' }}>
										{Number(monthlyValue || 0).toFixed(2) ?? '___'}
									</div>
								) : null}
							</div>
						) : (
							<div className={styles.list} key={key}>
								<div style={{ width: '60%' }}>
									{startCase(MAPPING?.[key]?.heading || '___')}
								</div>
								<div style={{ width: '20%' }}>
									{MAPPING?.[key]?.yearlyValue || '___'}
								</div>
								<div style={{ width: '20%' }}>
									{MAPPING?.[key]?.monthlyValue || '___'}
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
