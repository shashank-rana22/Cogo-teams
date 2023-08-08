import { InputController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function ErrorMessage({ message = '' }) {
	return <div className={styles.error_container}>{message || ''}</div>;
}

function InviteUser({ errors = {}, control = () => {}, newControls: controls = [] }) {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<div className={styles.label}>{controls[GLOBAL_CONSTANTS.zeroth_index].label}</div>

				<InputController control={control} {...controls[GLOBAL_CONSTANTS.zeroth_index]} />
				<ErrorMessage message={errors.name?.message} />
			</div>

			<div className={styles.section}>
				<div className={styles.label}>{controls[FIRST_INDEX].label}</div>

				<InputController control={control} {...controls[FIRST_INDEX]} />
				<ErrorMessage message={errors.email?.message} />
			</div>
		</div>
	);
}

export default InviteUser;
