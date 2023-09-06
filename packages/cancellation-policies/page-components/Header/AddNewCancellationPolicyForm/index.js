import { useForm } from '@cogoport/forms';
import React, { useImperativeHandle, forwardRef } from 'react';

import Layout from '../../../common/Layout';

import getControls from './controls';

function AddNewCancellationPolicyForm({ item = {}, handleSubmitForm = () => {} }, ref) {
	const DEFAULT_VALUES = {};

	const controls = getControls({ item });

	const { control, formState:{ errors = {} } = {}, watch, handleSubmit } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const onSubmit = (values) => handleSubmitForm({ data: values, item });

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));
	return (
		<div>
			<Layout controls={controls} control={control} errors={errors} formValues={watch()} />
		</div>
	);
}

export default forwardRef(AddNewCancellationPolicyForm);
