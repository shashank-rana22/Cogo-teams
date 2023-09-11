import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React, { useImperativeHandle, forwardRef, useEffect } from 'react';

import Layout from '../../../common/Layout';
import getCommoditiesMapper from '../../../helpers/getCommodityShipmentMapper';

import getControls from './getControls';

const ZERO = 0;
const ONE = 1;

const getCommodityOptions = ({ service, container_type }) => (getCommoditiesMapper({ service, container_type }) || [])
	.map((option) => ({ label: startCase(option), value: option }));

function AddNewCancellationPolicyForm({ item = {}, handleSubmitForm = () => {}, isEdit = false }, ref) {
	const controls = getControls({ item, isEdit });

	const DEFAULT_VALUES = {};

	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const { control, formState:{ errors = {} } = {}, watch, handleSubmit, setValue, reset } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const {
		service = '',
		charge_type = '',
		slabs = [],
		free_days = 0,
		container_type = 'standard',
	} = watch();

	useEffect(() => {
		slabs?.forEach((obj, index) => {
			if (index === ZERO) {
				setValue('slabs.0.lower_limit', Number(free_days) + ONE || ZERO);
			} else {
				setValue(
					`slabs.${index}.lower_limit`,
					Number(slabs[index - ONE].upper_limit) + ONE,
				);
			}
		});
	}, [slabs, free_days, setValue]);

	const showElements = {
		min_value        : charge_type === 'percentage',
		max_value        : charge_type === 'percentage',
		container_size   : service === 'fcl_freight',
		container_type   : service === 'fcl_freight',
		airline_id       : service === 'air_freight',
		conditions       : service === 'fcl_freight',
		conditions_label : service === 'fcl_freight',
	};

	const onSubmit = (values) => {
		handleSubmitForm({ data: values, item, reset });
	};

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));

	const handleFieldArrayAddCheck = ({ currentIndex }) => {
		const prevSlab = slabs[currentIndex - ONE];

		const isPrevSlabFilled = Object.keys(prevSlab || {}).every((k) => prevSlab[k]);
		if (!isPrevSlabFilled) Toast.error('Please fill details of previous slab before adding');
		return isPrevSlabFilled;
	};

	controls.forEach((ctrl, index) => {
		if (ctrl.name === 'commodity' && service) {
			controls[index].options = getCommodityOptions({ service, container_type });
		}

		if (ctrl.name === 'service') {
			controls[index].onChange = (val) => {
				reset();
				setValue('service', val);
			};
		}

		if (ctrl.name === 'slabs') {
			controls[index].handleFieldArrayAddCheck = handleFieldArrayAddCheck;
		}
	});

	return (
		<Layout
			controls={controls}
			control={control}
			errors={errors}
			formValues={watch()}
			showElements={showElements}
			// handleFieldArrayAddCheck={handleFieldArrayAddCheck}
		/>

	);
}

export default forwardRef(AddNewCancellationPolicyForm);
