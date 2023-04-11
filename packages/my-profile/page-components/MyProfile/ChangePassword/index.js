import { InputController } from '@cogoport/forms';
import React from 'react';

import PasswordValidator from '../PasswordValidator';

import styles from './styles.module.css';

function ChangePassword({
	control,
	errors,
	password,
	patternError = '',
}) {
	return (
		<div className={styles.container}>
			<div className={styles.label}>Enter password</div>

			<InputController
				{...control}
				control={control}
				errors={errors}
				name="password"

			/>

			<div className={styles.password_validator}>
				<PasswordValidator errorMessage={patternError} password={password} />
			</div>

		</div>
	);
}

export default ChangePassword;
