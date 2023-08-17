import { InputController, TextAreaController, UploadController, useForm } from '@cogoport/forms';
import React, { forwardRef, useImperativeHandle } from 'react';

import styles from './styles.module.css';

const MAX_SPAN = 12;
const PERCENT_FACTOR = 100;
const INCR_IN_INDEX_FOR_BL_SERIAL_NO = 1;
const controlTypeMapping = {
	file     : UploadController,
	text     : InputController,
	number   : InputController,
	textarea : TextAreaController,
};

function FormElement({ name, label, errors, type, span, ...rest }) {
	const Element = controlTypeMapping[type];

	const widthVal = (span / MAX_SPAN) * PERCENT_FACTOR;

	return Element ? (
		<div style={{ width: `${widthVal}%` }}>
			<div className={styles.label}>{label}</div>

			<Element name={name} type={type} {...rest} />

			{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

function Form({ id, bl_type = '', controls = [] }, ref) {
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
				{id + INCR_IN_INDEX_FOR_BL_SERIAL_NO}
			</div>

			<form className={styles.form_container}>
				{controls.map((item) => <FormElement control={control} errors={errors} {...item} key={item?.name} />)}
			</form>
		</main>
	);
}

export default forwardRef(Form);
