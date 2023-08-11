import { RadioGroup } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { CTC_BREAK_MAPPING } from '../../../../common/ctcbreakMapping';

import styles from './styles.module.css';

const TOFIXED_NUMBER = 2;
const DEFAULT_VALUE = 0;

const OPTIONS = [
	{ value: 'yes', label: 'Yes', disabled: true },
	{ value: 'no', label: 'No', disabled: true },
];

function ViewCtcBreakupContent({ metadata, is_offer_letter_applicable }) {
	const {
		joining_bonus_yearly,
		joining_bonus_monthly,
		performance_linked_variable_yearly,
		performance_linked_variable_monthly,
		retention_bonus_yearly,
		retention_bonus_twice_yearly,
		retention_bonus_thrice_yearly,
		retention_bonus_monthly,
		sign_on_bonus_monthly,
		sign_on_bonus_yearly,
	} = metadata || {};

	const shareOfferLetter = (is_offer_letter_applicable) ? 'yes' : 'no';

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
			heading      : 'Retention Bonus after 1 year',
			yearlyValue  : retention_bonus_yearly,
			monthlyValue : retention_bonus_monthly,
		},
		retention_bonus_twiceyearly: {
			heading     : 'Retention Bonus after 2 years',
			yearlyValue : retention_bonus_twice_yearly,
		},
		retention_bonus_thriceyearly: {
			heading     : 'Retention Bonus after 3 years',
			yearlyValue : retention_bonus_thrice_yearly,
		},
		sign_on_bonus_monthly: {
			heading      : 'Sign On Bonus',
			yearlyValue  : sign_on_bonus_yearly,
			monthlyValue : sign_on_bonus_monthly,
		},

	};

	return (
		<div className={styles.table_container}>
			<div className={styles.text_container}>
				Share offer letter?
				<RadioGroup
					options={OPTIONS}
					value={shareOfferLetter}
				/>
			</div>
			<div className={styles.heading}>
				<h4 style={{ width: '60%' }}>Components</h4>
				<h4 style={{ width: '20%' }}>Annual Salary</h4>
				<h4 style={{ width: '20%' }}>Monthly Salary</h4>
			</div>

			{CTC_BREAK_MAPPING.map((key) => {
				const { heading = null, yearlyValue = null, monthlyValue = null } = metadata[key] || {};

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
										<div>
											{Number(yearlyValue || DEFAULT_VALUE)
												.toFixed(TOFIXED_NUMBER) ?? '___'}

										</div>
									) : null}
								</div>

								{monthlyValue != null ? (
									<div style={{ width: '20%' }}>
										{Number(monthlyValue || DEFAULT_VALUE).toFixed(TOFIXED_NUMBER) ?? '___'}
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

export default ViewCtcBreakupContent;
