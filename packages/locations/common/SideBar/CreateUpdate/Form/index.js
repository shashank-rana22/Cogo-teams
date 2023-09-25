import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';
import { useImperativeHandle, forwardRef } from 'react';

import controls from '../../../../configurations/create-form';
import Layout from '../../../Layout';

function Form({ handleSubmitForm = () => {}, callBack = () => {} }, ref) {
	const DEFAULT_VALUES = {};
	const { t } = useTranslation(['locations']);
	const fields = controls({ t });

	const { control, handleSubmit, formState:{ errors = {} }, watch, setValue } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const {
		service_provider_id = '',
		free_days_type = '',
		location_type = '',
		detention = [],
		demurrage = [],
		free_limit,
	} = watch();

	const onSubmit = (values) => { console.log(values); handleSubmitForm({ data: values, callBack }); };

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));
	return <Layout controls={fields} control={control} errors={errors} />;
}

export default forwardRef(Form);
