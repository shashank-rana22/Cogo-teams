import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import NestedLayout from '../../../../../common/NestedLayout';
import controls from '../../../config/controls-air';

import styles from './styles.module.css';

function Form({ handleSubmitForm = () => {} }, ref) {
	const { control, handleSubmit, formState:{ errors = {} } } = useForm();
	const onSubmit = (values) => { handleSubmitForm({ values }); console.log('errors', errors); };
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
