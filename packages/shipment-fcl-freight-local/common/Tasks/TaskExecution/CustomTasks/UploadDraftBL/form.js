import { InputController, TextAreaController, UploadController, useForm } from '@cogoport/forms';
import { forwardRef, useImperativeHandle } from 'react';

import styles from './styles.module.css';

const CONTROL_TYPE_MAPPING = {
	file     : UploadController,
	text     : InputController,
	number   : InputController,
	textarea : TextAreaController,
};
const TOTAL_SPAN = 12;
const PERCENT = 100;
const INITIAL_STATE = 1;

function FormElement({ name, label, errors, type, span, ...rest }) {
	const Element = CONTROL_TYPE_MAPPING[type];
	const widthVal = (span / TOTAL_SPAN) * PERCENT;
	return Element ? (
		<div style={{ width: `${widthVal}%` }}>
			<div className={styles.label}>{label}</div>
			<Element name={name} type={type} {...rest} />
			{errors[name] ? <div>{errors[name].message}</div> : null}
		</div>
	) : null;
}

function Form(props, ref) {
	const {
		id, bl_type = '', controls = [],
	} = props || {};

	const {
		control,
		formState: { errors },
		trigger,
		getValues,
	} = useForm();

	useImperativeHandle(ref, () => ({ formTrigger: trigger, getFormValues: getValues }), [trigger, getValues]);

	return (
		<main className={styles.container}>
			<div className={styles.text}>
				{bl_type}
				&nbsp;
				{id + INITIAL_STATE}
			</div>
			<form className={styles.form_container}>
				{controls.map((item) => <FormElement control={control} errors={errors} {...item} key={item?.name} />)}
			</form>
		</main>
	);
}

export default forwardRef(Form);
