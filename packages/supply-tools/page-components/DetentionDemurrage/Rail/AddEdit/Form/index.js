import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useImperativeHandle, forwardRef, useEffect } from 'react';

import Layout from '../../../../../common/Layout';
import RAIL_SUB_COMMODITIES from '../../../../../configs/RAIL_SUB_COMMODITY.json';

import getControls from './getControls';

const INDEX_OFFSET = 1;
const INCR_FREE_LIMIT_BY = 1;
const DEFAULT_LIMIT = 0;

function Form({ item = {}, handleSubmitForm = () => {}, callBack = () => {} }, ref) {
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

	const {
		service_provider_id = '', free_days_type = '',
		commodity = '', detention = [], demurrage = [], free_limit,
	} = watch();

	const isDemmurage = free_days_type === 'demurrage';
	const isDetention = free_days_type === 'detention';

	controls.forEach((_c, index) => {
		if (controls[index]?.name === 'sourced_by_id' && service_provider_id) {
			controls[index].params = { filters: { organization_id: service_provider_id } };
		}

		if (controls[index]?.name === 'commodity_sub_type' && commodity) {
			controls[index].options = RAIL_SUB_COMMODITIES[commodity] || [];
		}
	});

	const onSubmit = (values) => handleSubmitForm({ data: values, item, callBack });

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
	}, [commodity, setValue]);

	useEffect(() => {
		if (isDetention && free_limit) {
			detention.forEach((_o, index) => {
				if (index === GLOBAL_CONSTANTS.zeroth_index) {
					setValue('detention.0.lower_limit', Number(free_limit) + INCR_FREE_LIMIT_BY || DEFAULT_LIMIT);
				} else {
					setValue(
						`detention.${index}.lower_limit`,
						Number(detention[index - INDEX_OFFSET].upper_limit) + INDEX_OFFSET,
					);
				}
			});
		} else if (isDemmurage) {
			demurrage.forEach((_o, index) => {
				if (index === GLOBAL_CONSTANTS.zeroth_index) {
					setValue('demurrage.0.lower_limit', Number(free_limit) + INCR_FREE_LIMIT_BY || DEFAULT_LIMIT);
				} else {
					setValue(
						`demurrage.${index}.lower_limit`,
						Number(demurrage[index - INDEX_OFFSET].upper_limit) + INCR_FREE_LIMIT_BY,
					);
				}
			});
		}
	}, [detention, demurrage, free_limit, isDemmurage, isDetention, setValue]);

	return <Layout controls={controls} control={control} errors={errors} showElements={showElements} />;
}

export default forwardRef(Form);
