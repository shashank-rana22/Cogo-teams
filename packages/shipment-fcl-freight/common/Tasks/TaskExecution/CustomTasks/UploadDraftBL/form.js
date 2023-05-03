import { InputController, TextAreaController, UploadController, useForm } from '@cogoport/forms';
import React, { forwardRef } from 'react';

import styles from './styles.module.css';

function Form(props) {
	const {
		id, bl_type = '', controls = [],
	} = props || {};

	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const controlTypeMapping = {
		file     : UploadController,
		text     : InputController,
		number   : InputController,
		textarea : TextAreaController,
	};

	function FormElement({ name, label, type, span, ...rest }) {
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

	return (
		<main className={styles.container}>
			<div className={styles.text}>
				{bl_type}
				&nbsp;
				{id + 1}
			</div>
			<form className={styles.form_container}>
				{controls.map((item) => <FormElement control={control} errors={errors} {...item} />)}
			</form>
		</main>
	);
}

export default forwardRef(Form);
