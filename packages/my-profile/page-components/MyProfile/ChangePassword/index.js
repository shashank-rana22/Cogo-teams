import { CheckboxController, InputController } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';
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
	const { t } = useTranslation(['profile']);

	return (
		<div className={styles.container}>
			<div className={styles.label}>{t('profile:controls_password_label')}</div>

			<InputController
				{...control}
				control={control}
				errors={errors}
				name="password"
				placeholder={t('profile:controls_password_placeholder')}
				rules={{
					required : true,
					validate : (value) => validatePassword({
						value,
						errorMessage: t('profile:controls_password_error_message'),
						t,
					}),
				}}

			/>

			<div className={styles.password_validator}>
				<PasswordValidator errorMessage={errors?.password?.message || patternError} password={password} />
			</div>

			<div className={styles.checkbox}>
				<CheckboxController
					name="deactivate_sessions"
					control={control}
				/>
				<label>{t('profile:account_logout_message')}</label>
			</div>

		</div>
	);
}

export default ChangePassword;
