import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useImperativeHandle, forwardRef, useEffect } from 'react';

import Layout from '../../../../common/Layout';

import getControls from './getControls';

const INDEX_OFFSET = 1;
const INCR_FREE_LIMIT_BY = 0.1;
const DEFAULT_LIMIT = 0;

function Form({ item = {}, handleSubmitForm = () => {}, callBack = () => {} }, ref) {
	const DEFAULT_VALUES = {};

	const controls = getControls({ item });

	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const { control, handleSubmit, formState:{ errors = {} }, watch, setValue } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const {
		origin_location_type = '',
		destination_location_type = '',
		slabs = [],
		max_weight = '',
	} = watch();

	controls.forEach((_c, index) => {
		if (controls[index]?.name === 'origin_location_id' && origin_location_type) {
			controls[index].params = { filters: { type: origin_location_type || undefined } };
		}

		if (controls[index]?.name === 'destination_location_id' && destination_location_type) {
			controls[index].params = { filters: { type: destination_location_type || undefined } };
		}
	});

	const onSubmit = (values) => handleSubmitForm({ data: values, item, callBack });

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));

	useEffect(() => {
		slabs.forEach((_, index) => {
			if (index === GLOBAL_CONSTANTS.zeroth_index) {
				setValue('slabs.0.lower_limit', Number(max_weight) + INCR_FREE_LIMIT_BY || DEFAULT_LIMIT);
			} else {
				setValue(
					`slabs.${index}.lower_limit`,
					Number(slabs[index - INDEX_OFFSET].upper_limit) + INCR_FREE_LIMIT_BY,
				);
			}
		});
	}, [max_weight, setValue, slabs]);

	return <Layout controls={controls} control={control} errors={errors} />;
}

export default forwardRef(Form);
