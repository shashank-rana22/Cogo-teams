import { FluidContainer, Button } from '@cogoport/components';
import { useForm, InputController } from '@cogoport/components/src/forms';
import React from 'react';
import LogoCogoport from '../../assets/cogo-logo-black.svg';
import IconMicrosoft from '../../assets/microsoft.svg';
import getControls from '../../configurations/login_controls.json';

import styles from './styles.module.css';
import useFormLoginwithMS from './useFormLoginwithMS';
import useLoginAuthenticate from './useLoginAuthenticate';

const getDefaultValues = (controls) => {
	const values = {};
	const newControls = controls.map((control) => {
		const { value, ...rest } = control;
		values[control.name] = value || '';
		return rest;
	});
	return { controls: newControls, values };
};

function Login() {
	const { onSubmit = () => {} } = useLoginAuthenticate();
	const { controls, values } = getDefaultValues(getControls);
	const { onLogin = () => {} } = useFormLoginwithMS();
	const {
		register, handleSubmit, formState: { errors }, control,
	} = useForm({ defaultValues: values });

	const fields = {};

	controls.forEach((controlItem) => {
		const registerValues = register(controlItem.name, { ...(controlItem.rules || {}) });
		const field = { ...controlItem, ...registerValues };
		fields[controlItem.name] = field;
	});

	// console.log('error', errors);

	return (
		<FluidContainer className={styles.container}>
			<div className={styles.box_container}>
				<div>
					<LogoCogoport width={240} height={100} />
					<div className={styles.sub_heading}>ADMIN</div>
				</div>
				<form onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
					<div className={styles.input_container}>
						<div className={styles.input_label}>Please provide your email and password to login</div>
						<InputController
							className={styles.form}
							{...fields.email}
							control={control}
						/>
						{errors.email && <div>{errors.email.message}</div>}
						<br />
						<div className={styles.password_container}>
							<InputController
								{...fields.password}
								className={styles.password}
								control={control}
							/>
						</div>
						{errors.password && <div>{errors.password.message}</div>}
						<Button className={styles.submit_button} type="submit">LOGIN</Button>

						<div className={styles.forgot}>
							Forgot your password?
							{' '}
							<a href="/forgot-password">Click here</a>
						</div>
						<div className={styles.or} style={{ margin: '16px 0' }}>
							<hr className={styles.line} style={{ width: '40%' }} />
							OR
							<hr className={styles.line} style={{ width: '40%' }} />
						</div>

						<Button
							className={styles.submit_button1}
							onClick={() => onLogin()}
						>
							<IconMicrosoft />
							<p className={styles.micro}>CONTINUE WITH MICROSOFT</p>
						</Button>

					</div>
				</form>
			</div>
		</FluidContainer>
	);
}
export default Login;
