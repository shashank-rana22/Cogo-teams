import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import Layout from '../../../common/Layout';

import getControls from './getControls';

function Form({ item = {}, handleSubmitForm = () => {} }, ref) {
	const DEFAULT_VALUES = {};

	const controls = getControls({ item });

	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const { control, handleSubmit, formState:{ errors = {} }, watch } = useForm({
		defaultValues: DEFAULT_VALUES,
	});
	const values = watch();
	const onSubmit = () => handleSubmitForm(values);

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));

	return <Layout controls={controls} control={control} errors={errors} />;
}

export default forwardRef(Form);
