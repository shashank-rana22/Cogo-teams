import { RadioGroupController, InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function JoiningBonus({ control = {}, errors = {}, data = {} }) {
	const { joiningBonus, joiningBonusApplicable } = data || {};
	console.log('🚀 ~ file: index.js:8 ~ JoiningBonus ~ joiningBonusApplicable:', joiningBonusApplicable);
	const options = [
		{ name: 'R1', value: 'yes', label: 'yes' }, { name: 'R2', value: 'no', label: 'no' },
	];

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Joining Bonus Clawback Applicable?</div>
			<div className={styles.dates}>
				<RadioGroupController
					control={control}
					name="joining_bonus_clawback"
					options={options}
					disabled={joiningBonusApplicable}
				/>
				{errors.joining_bonus_clawback && (
					<span className={styles.error}>Selection is Required</span>
				)}
			</div>
			<div className={styles.footer}>
				<div className={styles.heading}>Joining Bonus Amount</div>
				<InputController
					control={control}
					type="number"
					name="joining_bonus_amount"
					size="md"
					style={{ marginRight: '8px', width: 200 }}
					placeholder="Enter amount"
					disabled={joiningBonus}
				/>
				{errors.joining_bonus_amount && (
					<span className={styles.error}>*Amount is Required</span>
				)}
			</div>
		</div>
	);
}

export default JoiningBonus;
