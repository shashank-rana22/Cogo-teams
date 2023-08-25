import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import Layout from '../../../../../common/Layout';

import getControls from './getControls';

function Form({ item = {} }, ref) {
	const controls = getControls({ item });

	const DEFAULT_VALUES = {};

	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const { control, handleSubmit, formState:{ errors = {} }, watch } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const watchServiceProvider = watch('service_provider_id');

	controls.forEach((_c, index) => {
		if (controls[index]?.name === 'sourced_by_id' && watchServiceProvider) {
			controls[index].params = { filters: { organization_id: watchServiceProvider } };
		}
	});

	const onSubmit = (values) => (values);

	const onError = (err) => (err);

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit, onError)();
		},
	}));

	return <Layout controls={controls} control={control} errors={errors} />;
}

export default forwardRef(Form);
