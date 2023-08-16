import { FluidContainer, Button } from '@cogoport/components';
import { useForm, InputController } from '@cogoport/forms';
import { IcCMicrosoft, IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useFormLoginwithMS from '../../hooks/useFormLoginwithMS';
import useLoginAuthenticate from '../../hooks/useLoginAuthenticate';

import styles from './styles.module.css';

function Login() {
	const router = useRouter();

	const { t } = useTranslation(['login']);

	const { onSubmit = () => {}, loading = false, source = '' } = useLoginAuthenticate();
	const { onLogin = () => {}, socialLoginLoading = false } = useFormLoginwithMS();
	const [showPassword, setShowPassword] = useState(false);
	const { handleSubmit, formState: { errors }, control } = useForm();

	function RenderSuffix() {
		if (!showPassword) {
			return <IcMEyeopen className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
		}
		return <IcMEyeclose className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
	}

	return (
		<FluidContainer className={styles.container}>
			<div className={styles.box_container}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-admin.svg"
					alt="Logo Cogoport"
					className={styles.logo}
				/>
				<div className={styles.input_label}>
					{t('login:title')}
				</div>
				<form className={styles.form_container} onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
					<div className={styles.input_container}>
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

						<div className={styles.or}>
							<hr className={styles.line} />
							{t('login:or_label')}
							<hr className={styles.line} />
						</div>

						<Button
							loading={socialLoginLoading}
							themeType="secondary"
							className={styles.submit_button}
							style={{ fontWeight: '500' }}
							onClick={onLogin}
						>
							<IcCMicrosoft />
							<p className={styles.micro}>{t('login:continue_with_microsoft')}</p>
						</Button>
					</div>
				</form>
			</div>
		</FluidContainer>
	);
}
export default Login;
