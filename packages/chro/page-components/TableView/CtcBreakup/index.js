import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function CtcBreakup({ metadata }) {
	const {
		joining_bonus_yearly,
		joining_bonus_monthly,
		performance_linked_variable_yearly,
		performance_linked_variable_monthly,
		retention_bonus_yearly,
		retention_bonus_monthly,
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

	};
	return (
		<div className={styles.table_container}>
			<div className={styles.heading}>
				<h4 style={{ width: '60%' }}>Components</h4>
				<h4 style={{ width: '20%' }}>Annual Salary</h4>
				<h4 style={{ width: '20%' }}>Monthly Salary</h4>
			</div>

			{Object.entries(metadata).map(([key, value]) => {
        	const { heading = null, yearlyValue = null, monthlyValue = null } = value;
        	return (
	<div key={key}>
		{heading != null ? (
			<div className={styles.list} key={key}>
				{heading ? <div style={{ width: '60%' }}>{startCase(heading ?? '___')}</div> : null}
				{yearlyValue != null ? (
					<div style={{ width: '20%' }}>
						{yearlyValue.toFixed(2) ?? '___'}
					</div>
				) : null}
				{monthlyValue != null ? (
					<div style={{ width: '20%' }}>
						{monthlyValue.toFixed(2) ?? '___'}
					</div>
				) : null}
			</div>
		) : (
			<div className={styles.list} key={key}>
				<div style={{ width: '60%' }}>{startCase(MAPPING?.[key]?.heading ?? '___')}</div>
				<div style={{ width: '20%' }}>
					{MAPPING?.[key]?.yearlyValue ?? '___'}
				</div>
				<div style={{ width: '20%' }}>
					{MAPPING?.[key]?.monthlyValue ?? '___'}
				</div>
			</div>
		)}

	</div>
);
			})}
			;
		</div>
	);
}

export default CtcBreakup;
