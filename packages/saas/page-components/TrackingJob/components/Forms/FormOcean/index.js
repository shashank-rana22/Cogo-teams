import { useForm } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef, useMemo } from 'react';

import NestedLayout from '../../../../../common/NestedLayout';

import formControls from './controls-ocean';
import styles from './styles.module.css';

function Form({
	handleSubmitForm = () => {},
	showUpdate = {},
}, ref) {
	const { control, handleSubmit, formState:{ errors = {} } } = useForm({
		defaultValues: {
			containers: [{
				container_no: showUpdate?.data?.container_no?.[0],
			}],
		},
	});

	const controls = useMemo(() => formControls(showUpdate), [showUpdate]);

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
