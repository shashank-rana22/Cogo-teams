import {
	InputController, MobileNumberController,
	SelectController, TextAreaController, UploadController,
	AsyncSelectController,
} from '@cogoport/forms';

import styles from './styles.module.css';

const CONTROL_TYPE_MAPPING = {
	file         : UploadController,
	text         : InputController,
	number       : InputController,
	textarea     : TextAreaController,
	select       : SelectController,
	mobileSelect : MobileNumberController,
	async_select : AsyncSelectController,
};

const VALIDATION_ERROR = ['required', 'pattern', 'maxLength', 'length', 'validate'];

function FormElement({ name, label, type, errors, span, ...rest }) {
	const Element = CONTROL_TYPE_MAPPING[type];

	return Element ? (
		<div className={styles.element}>
			<label className={styles.label}>{label}</label>
			<Element
				name={name}
				type={type}
				{...rest}
			/>
			{VALIDATION_ERROR.includes(errors?.[name]?.type) ? (
				<div className={styles.text}>
					{errors?.[name]?.message}
				</div>
			) : null}
		</div>
	) : null;
}

export default FormElement;
