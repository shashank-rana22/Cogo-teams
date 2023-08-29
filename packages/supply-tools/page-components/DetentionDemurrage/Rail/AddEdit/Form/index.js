import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef, useEffect } from 'react';

import Layout from '../../../../../common/Layout';
import RAIL_SUB_COMMODITIES from '../../../../../configs/RAIL_SUB_COMMODITY.json';

import getControls from './getControls';

function Form({ item = {}, handleSubmitForm = () => {} }, ref) {
	const controls = getControls({ item });

	const DEFAULT_VALUES = {};

	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const { control, setValue, handleSubmit, formState:{ errors = {} }, watch } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const watchServiceProvider = watch('service_provider_id');
	const watchFreeDaysType = watch('free_days_type');
	const watchCommodity = watch('commodity');

	controls.forEach((_c, index) => {
		if (controls[index]?.name === 'sourced_by_id' && watchServiceProvider) {
			controls[index].params = { filters: { organization_id: watchServiceProvider } };
		}

		if (controls[index]?.name === 'commodity_sub_type' && watchCommodity) {
			controls[index].options = RAIL_SUB_COMMODITIES[watchCommodity] || [];
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
			return handleSubmit(onSubmit)();
		},
	}));

	useEffect(() => {
		setValue('commodity_sub_type', '');
	}, [watchCommodity, setValue]);

	return <Layout controls={controls} control={control} errors={errors} showElements={showElements} />;
}

export default forwardRef(Form);
