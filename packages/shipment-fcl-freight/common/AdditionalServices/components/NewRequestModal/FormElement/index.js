import {
	AsyncSelectController,
	DatepickerController,
	InputController,
	SelectController,
	TextAreaController,
	UploadController,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const controlTypeMapping = {
	text        : InputController,
	select      : SelectController,
	textarea    : TextAreaController,
	number      : InputController,
	asyncSelect : AsyncSelectController,
	upload      : UploadController,
	datepicker  : DatepickerController,
};

function FormElement({ name = '', label = '', type = '', errors = {}, showElements = {}, ...rest }) {
	const Element = controlTypeMapping[type];
	const show = !isEmpty(showElements[name]) ? showElements[name] : true;

	return (Element && show) ? (
		<div>
			<div className={styles.label}>{label}</div>
			<Element name={name} type={type} {...rest} />
			{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

export default FormElement;
