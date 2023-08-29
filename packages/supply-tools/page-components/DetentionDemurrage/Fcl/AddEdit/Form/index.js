import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import Layout from '../../../../../common/Layout';

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

	const watchServiceProvider = watch('service_provider_id');
	const watchFreeDaysType = watch('free_days_type');

	controls.forEach((_c, index) => {
		if (controls[index]?.name === 'sourced_by_id' && watchServiceProvider) {
			controls[index].params = { filters: { organization_id: watchServiceProvider } };
		}
	});

	const onSubmit = (values) => handleSubmitForm(values);

	const isDemmurage = watchFreeDaysType === 'demurrage';
	const isDetention = watchFreeDaysType === 'detention';

	const showElements = {
		demurrage       : isDemmurage,
		demurrage_label : isDemmurage,
		detention       : isDetention,
		detention_label : isDetention,
	};

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));

	return <Layout controls={controls} control={control} errors={errors} showElements={showElements} />;
}

export default forwardRef(Form);
