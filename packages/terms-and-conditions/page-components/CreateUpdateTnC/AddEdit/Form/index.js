import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import Layout from '../../../../common/Layout';
import getShowElements from '../../../../utlis/getShowElements';

import getControls from './controls';

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
	const watchShippingLineId = watch('shipping_line_id');
	const watchCountry = watch('country');
	const watchAirlineId = watch('airline_id');
	const watchTradeType = watch('trade_type');
	const watchService = watch('service');
	const watchPayingPartyCountry = watch('paying_party_country_ids');
	const watchDescription = watch('description');

	const onSubmit = (values) => (values);

	const onError = (err) => (err);

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit, onError)();
		},
	}));

	const showElements = getShowElements({ service: watchService, trade_type: watchTradeType, controls });

	return <Layout controls={controls} control={control} errors={errors} showElements={showElements} />;
}

export default forwardRef(Form);
