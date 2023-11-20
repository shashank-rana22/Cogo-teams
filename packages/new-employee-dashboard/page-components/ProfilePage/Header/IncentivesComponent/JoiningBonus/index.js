import { InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function JoiningBonus(
	{
		control = {},
		formProps = {},
	},
) {
//  const { errors, control } = useProfileDetails();
	// console.log('errors :::: ', errors, control);
	const { formState:{ errors } } = formProps;

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Joining Bonus
			</div>
			<div className={styles.bonus_input}>
				<InputController
					control={control}
					size="md"
					type="number"
					name="JoiningBonus"
					placeholder="Amount In Rupees"
					rules={{ required: { value: true, message: '*This Field is required' } }}
				/>
				{errors.JoiningBonus ? <div className={styles.error}>*required</div> : null}

			</div>
		</div>
	);
}

export default JoiningBonus;
