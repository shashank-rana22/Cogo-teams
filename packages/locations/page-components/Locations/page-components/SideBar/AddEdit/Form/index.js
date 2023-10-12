import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useImperativeHandle, forwardRef } from 'react';

import Layout from '../../../../../../common/Layout';
import controls from '../../../../configurations/create-form';
import getShowElement from '../../../../utils/get-show-control';

function Form({ handleSubmitForm = () => {}, callBack = () => {}, item = {} }, ref) {
	const DEFAULT_VALUES = {};

	const { t } = useTranslation(['locations']);

	let fields = controls({ t, item });

	if (!isEmpty(item)) {
		fields = fields?.map((data) => ({ ...data, value: item[data?.name] }));
	}

	fields.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const { control, handleSubmit, formState:{ errors = {} }, watch } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const showElements = getShowElement({ controls: fields, formValues: watch() });

	const onSubmit = (values) => handleSubmitForm({ values, callBack });

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));
	return (

		<Layout
			controls={fields}
			control={control}
			errors={errors}
			showElements={showElements}
		/>
	);
}

export default forwardRef(Form);
