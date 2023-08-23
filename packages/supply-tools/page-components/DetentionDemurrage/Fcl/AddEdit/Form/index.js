import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import Layout from '../../../common/Layout';

import getControls from './getControls';

function Form({ item = {} }, ref) {
	const controls = getControls({ item });

	const DEFAULT_VALUES = {};

	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const { control, handleSubmit, formState:{ errors = {} } } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const onSubmit = (values) => {
		console.log({ values });
	};

	const onError = (err) => {
		console.log({ err });
	};

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit, onError)();
		},
	}));

	return <Layout controls={controls} control={control} errors={errors} />;
}

export default forwardRef(Form);
