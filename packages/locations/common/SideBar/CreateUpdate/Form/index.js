import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';
import { useImperativeHandle, forwardRef } from 'react';

import controls from '../../../../configurations/create-form';
import getShowElement from '../../../../utils/get-show-control';
import Layout from '../../../Layout';

function Form({ handleSubmitForm = () => {}, callBack = () => {} }, ref) {
	const DEFAULT_VALUES = {};
	const { t } = useTranslation(['locations']);
	const fields = controls({ t });
	const ctrl = [...(fields?.controls || [])].filter((control) => getShowElement(control, {}));
	console.log(ctrl);
	const { control, handleSubmit, formState:{ errors = {} }, watch, setValue } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const onSubmit = (values) => { console.log(values); handleSubmitForm({ data: values, callBack }); };

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));
	return (
		<Layout
			controls={ctrl}
			control={control}
			errors={errors}
			// showElements={getShowElement({ control, formValues: watch() })}
		/>
	);
}

export default forwardRef(Form);
