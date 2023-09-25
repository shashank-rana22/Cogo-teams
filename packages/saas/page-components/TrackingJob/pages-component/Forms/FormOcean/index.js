import { useForm } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef } from 'react';

import NestedLayout from '../../../../../common/NestedLayout';
import formControls from '../../../config/controls-ocean';

import styles from './styles.module.css';

function Form({
	handleSubmitForm = () => {},
	showUpdate,
}, ref) {
	const { control, handleSubmit, formState:{ errors = {} } } = useForm();
	const controls = formControls({ isDisabled: true, showUpdate });
	const onSubmit = (values) => handleSubmitForm({ values });
	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));
	return (
		<div className={styles.form_container}>
			<NestedLayout control={control} controls={controls} errors={errors} />
		</div>
	);
}

export default forwardRef(Form);
