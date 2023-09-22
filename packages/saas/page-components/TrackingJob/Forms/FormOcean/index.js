import { useForm } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef } from 'react';

import NestedLayout from '../../../../common/NestedLayout';
import formControls from '../../config/controls-ocean';

function Form({
	handleSubmitForm = () => {},
}, ref) {
	const { control, handleSubmit, formState:{ errors = {} } } = useForm();
	const controls = formControls({ isDisabled: true });
	const onSubmit = (values) => { console.log('hell'); handleSubmitForm({ values }); };
	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));
	return (
		<div>
			<NestedLayout control={control} controls={controls} errors={errors} />
		</div>
	);
}

export default forwardRef(Form);
