import { InputController, TextAreaController, UploadController, useForm } from '@cogoport/forms';
import React, { forwardRef, useImperativeHandle } from 'react';

import styles from './styles.module.css';

const controlTypeMapping = {
	file     : UploadController,
	text     : InputController,
	number   : InputController,
	textarea : TextAreaController,
};

function FormElement({ name, label, errors, type, span, ...rest }) {
	const Element = controlTypeMapping[type];
	const widthVal = (span / 12) * 100;
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
				{id + 1}
			</div>
			<form className={styles.form_container}>
				{controls.map((item) => <FormElement control={control} errors={errors} {...item} key={item?.name} />)}
			</form>
		</main>
	);
}

export default forwardRef(Form);
