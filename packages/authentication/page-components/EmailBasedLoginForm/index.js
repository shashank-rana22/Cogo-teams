import { Button } from '@cogoport/components';
import { useForm, InputController } from '@cogoport/forms';
import { IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useLoginAuthenticate from '../../hooks/useLoginAuthenticate';

import styles from './styles.module.css';

function EmailBasedLoginForm() {
	const router = useRouter();
	const { t } = useTranslation(['login']);

	const [showPassword, setShowPassword] = useState(false);

	const { handleSubmit, formState: { errors }, control } = useForm();
	const { onSubmit = () => {}, loading = false, source = '' } = useLoginAuthenticate({
		type: 'eamil_auth',
	});

	function RenderSuffix() {
		if (!showPassword) {
			return <IcMEyeopen className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
		}
		return <IcMEyeclose className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
	}
	return (
		<div className={styles.container}>
			<div className={styles.input_label}>
				{t('login:title')}
			</div>
			<form className={styles.form_container} onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
				<InputController
					control={control}
					name="email"
					type="email"
					placeholder={t('login:email_placeholder')}
					rules={{ required: t('login:email_rules_required') }}
				/>
				{errors.email && (
					<span className={styles.errors}>
						{errors.email.message}
					</span>
				)}
				<br />
				<div className={styles.password_container}>
					<InputController
						control={control}
						name="password"
						type={showPassword ? 'text' : 'password'}
						suffix={<RenderSuffix />}
						placeholder={t('login:password_placeholder')}
						rules={{ required: t('login:password_rules_required') }}
					/>
				</div>
				{errors.password && (
					<span className={styles.errors}>
						{errors.password.message}
					</span>
				)}

				<div className={styles.forgot}>
					<a href="/forgot-password">{t('login:forgot_your_password')}</a>
				</div>

				<Button
					loading={loading}
					className={styles.submit_button}
					type="submit"
				>
					{t('login:login_button')}
				</Button>

				{source === 'add_account'
						&& (
							<Button
								themeType="accent"
								onClick={() => router.back()}
								className={styles.go_back}
								type="button"
							>
								{t('login:go_back_button')}
							</Button>
						)}

			</form>
		</div>
	);
}

export default EmailBasedLoginForm;
