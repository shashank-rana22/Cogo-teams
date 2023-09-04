import {
	InputController,
	SelectController,
	UploadController,
	DatepickerController,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const controlTypeMapping = {
	text       : InputController,
	select     : SelectController,
	number     : InputController,
	upload     : UploadController,
	datepicker : DatepickerController,
};

function FormElement({ name = '', label = '', type = '', errors = {}, showElements = {}, ...rest }) {
	const Element = controlTypeMapping[type];
	if (Element === null) return null;

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
