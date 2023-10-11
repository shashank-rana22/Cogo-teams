import { useForm } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';

import NestedLayout from '../../../../../common/NestedLayout';

import formControls from './controls-ocean';
import styles from './styles.module.css';

function Form({
	handleSubmitForm = () => {},
	showUpdate = {},
}, ref) {
	const [isDisabled, setDisabled] = useState(false);
	useEffect(() => {
		if (showUpdate?.data?.search_type === 'CONTAINER_NO') {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [showUpdate]);
	const { control, handleSubmit, formState:{ errors = {} } } = useForm();

	const controls = formControls({ isDisabled, showUpdate });

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
