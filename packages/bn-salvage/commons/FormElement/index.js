import { cl } from '@cogoport/components';
import {
	AsyncSelectController,
	DatepickerController,
	InputController,
	SelectController,
	UploadController,
} from '@cogoport/forms';

import styles from './styles.module.css';

const controlTypeMapping = {
	select       : SelectController,
	async_select : AsyncSelectController,
	text         : InputController,
	number       : InputController,
	file         : UploadController,
	datepicker   : DatepickerController,
};

export default function FormElement({ name, label, errors, type, ...rest }) {
	const Element = controlTypeMapping[type];

	return Element ? (
		<div className={cl`${styles.form_element} ${styles[rest.className]}`}>
			<div className={styles.label}>{label}</div>

			<Element name={name} type={type} {...rest} />

			{errors[name] ? <div className={styles.error_msg}>{errors[name].message}</div> : null}
		</div>
	) : null;
}
