import { InputController } from '@cogoport/forms';

import styles from './styles.module.css';

function ErrorMessage({ message }) {
	return <div className={styles.error_container}>{message || ''}</div>;
}

function InviteUser({ errors = {}, control, newControls: controls }) {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<div className={styles.label}>{controls[0].label}</div>

				<InputController control={control} {...controls[0]} />
				<ErrorMessage message={errors.name?.message} />
			</div>

			<div className={styles.section}>
				<div className={styles.label}>{controls[1].label}</div>

				<InputController control={control} {...controls[1]} />
				<ErrorMessage message={errors.email?.message} />
			</div>
		</div>
	);
}

export default InviteUser;
