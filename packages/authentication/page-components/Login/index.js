import { FluidContainer, Button } from '@cogoport/components';
import { useForm, InputController } from '@cogoport/forms';
import { IcCMicrosoft } from '@cogoport/icons-react';
import React from 'react';

import useFormLoginwithMS from '../../hooks/useFormLoginwithMS';
import useLoginAuthenticate from '../../hooks/useLoginAuthenticate';

import styles from './styles.module.css';

function Login() {
	const { onSubmit = () => {} } = useLoginAuthenticate();
	const { onLogin = () => {} } = useFormLoginwithMS();
	const { handleSubmit, formState: { errors }, control } = useForm();

	return (
		<FluidContainer className={styles.container}>
			<div className={styles.box_container}>
				<img
					src="https://cdn.cogoport.io/cms-prod/vault/original/logo-cogoport-1.svg"
					alt="Logo Cogoport"
					className={styles.logo}
				/>
				<h3 className={styles.sub_heading}>ADMIN</h3>

				<form onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
					<div className={styles.input_container}>
						<div className={styles.input_label}>Please provide your email and password to login</div>
						<InputController
							control={control}
							name="email"
							placeholder="Please enter Email"
							rules={{ required: 'Email is required.' }}
						/>
						{errors.email && <div>{errors.email.message}</div>}
						<br />
						<div className={styles.password_container}>
							<InputController
								control={control}
								name="password"
								type="password"
								placeholder="Please enter Password"
								rules={{ required: 'Password is required.' }}
							/>
						</div>
						{errors.password && <div>{errors.password.message}</div>}
						<Button className={styles.submit_button} type="submit">LOGIN</Button>

						<div className={styles.forgot}>
							<span>Forgot your password? </span>
							<a href="/forgot-password">Click here</a>
						</div>
						<div className={styles.or} style={{ margin: '16px 0' }}>
							<hr className={styles.line} style={{ width: '40%' }} />
							OR
							<hr className={styles.line} style={{ width: '40%' }} />
						</div>

						<Button onClick={onLogin}>
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
