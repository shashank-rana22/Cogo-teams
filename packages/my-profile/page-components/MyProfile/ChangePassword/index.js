import { InputController } from '@cogoport/forms';
import React from 'react';

import PasswordValidator from '../PasswordValidator';
import validatePassword from '../PasswordValidator/utils/validatePassword';

import styles from './styles.module.css';

function ChangePassword({
	control,
	errors,
	password,
	patternError,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.label}>Enter password</div>

			<InputController
				{...control}
				control={control}
				errors={errors}
				name="password"
				rules={{
					required : true,
					validate : (value) => validatePassword({
						value,
						errorMessage: 'Password is invalid',
					}),
				}}

			/>
			<div className={styles.password_validator}>
				<PasswordValidator errorMessage={errors?.password?.message || patternError} password={password} />
			</div>

		</div>
	);
}

export default ChangePassword;
