import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import NestedLayout from '../../../../common/NestedLayout';
import controls from '../../config/controls-air';

function Form({ handleSubmitForm = () => {} }, ref) {
	const { control, handleSubmit, formState:{ errors = {} } } = useForm();
	const onSubmit = (values) => handleSubmitForm({ values });
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
