import { FluidContainer, Button } from '@cogoport/components';
import { useForm, InputController } from '@cogoport/forms';
import { IcCMicrosoft, IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useFormLoginwithMS from '../../hooks/useFormLoginwithMS';
import useLoginAuthenticate from '../../hooks/useLoginAuthenticate';

import styles from './styles.module.css';

function Login() {
	const router = useRouter();

	const { onSubmit = () => {}, loading = false, source = '' } = useLoginAuthenticate();
	const { onLogin = () => {}, socialLoginLoading = false } = useFormLoginwithMS();
	const { handleSubmit, formState: { errors }, control } = useForm();
	const [showPassword, setShowPassword] = useState(false);

	const renderSuffix = () => {
		if (!showPassword) {
			return <IcMEyeopen className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
		}
		return <IcMEyeclose className={styles.show_password} onClick={() => setShowPassword(!showPassword)} />;
	};

	return (
		<FluidContainer className={styles.container}>
			<div className={styles.box_container}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-admin.svg"
					alt="Logo Cogoport"
					className={styles.logo}
				/>
				<div className={styles.input_label}>
					Please provide your email and password to login
				</div>
				<form className={styles.form_container} onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
					<div className={styles.input_container}>
						<InputController
							control={control}
							name="email"
							type="email"
							placeholder="Email"
							rules={{ required: 'Email is required.' }}
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
								suffix={renderSuffix()}
								placeholder="Password"
								rules={{ required: 'Password is required.' }}
							/>
						</div>
						{errors.password && (
							<span className={styles.errors}>
								{errors.password.message}
							</span>
						)}

						<div className={styles.forgot}>
							<a href="/forgot-password">Forgot your password?</a>
						</div>

						<Button
							loading={loading}
							className={styles.submit_button}
							type="submit"
						>
							LOGIN
						</Button>

						{source === 'add_account'
						&& (
							<Button
								themeType="accent"
								onClick={() => router.back()}
								className={styles.go_back}
								type="button"
							>
								GO BACK
							</Button>
						)}

						<div className={styles.or}>
							<hr className={styles.line} />
							OR
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
							<p className={styles.micro}>CONTINUE WITH MICROSOFT</p>
						</Button>
					</div>
				</form>
			</div>
		</FluidContainer>
	);
}
export default Login;
