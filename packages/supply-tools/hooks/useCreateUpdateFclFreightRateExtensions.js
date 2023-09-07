import { Toast } from '@cogoport/components';
import useForm from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import fclFreightRateFormatter from '../helpers/fclFreightRateFormatter';
import fclFreightControls from '../page-components/FclRateExtensions/components/Create/controls/fcl-freight';

import useGetChargeCodes from './useGetChargeCodes';

const placeholder = {
	cluster_reference_name: {
		location  : 'Please search location...',
		commodity : 'Please search commodity...',
		container : 'Please search container type',
	},
};

const useCreateUpdateFclFreightRateExtensions = ({
	item,
	setItem,
	handleOnCreate,
}) => {
	let url = '/create_fcl_freight_rate_extension_rule_set';
	if (item?.isEdit) {
		url = '/update_fcl_freight_rate_extension_rule_set';
	}

	const controlsFclFreight = fclFreightControls({
		item,
	});

	const {
		general: { scope },
	} = useSelector((state) => state);
	const { list: chargeCodes } = useGetChargeCodes({});
	const [errors, setErrors] = useState({});
	// const [objectData, setObjectData] = useState({});

	// const { trigger, loading } = useRequest('post', false, scope)(url);

	const [{ loading }, trigger] = useRequest({
		url,
		method: 'POST',
		scope,
	}, { manual: false });

	const getDefaultValues = (controls) => {
		const VALUES = {};
		const newControls = controls.map((control) => {
			const { value, ...rest } = control;
			if (control.type === 'fieldArray') {
				VALUES[control.name] = value || [];
			} else {
				VALUES[control.name] = value || '';
			}
			return rest;
		});
		return { controls: newControls, VALUES };
	};

	const useFormCogo = (oldControls) => {
		const { controls, values } = getDefaultValues(oldControls);
		const { register, getValues, control, setValue, ...rest } = useForm({ defaultValues: values });
		const FIELDS = {};
		controls.forEach((controlItem) => {
			const { watch = true } = controlItem;
			if (watch || controlItem.type === 'fieldArray') {
				FIELDS[controlItem.name] = { ...controlItem, control, register };
			} else {
				const registerValues = register(controlItem.name, { ...(controlItem.rules || {}) });
				const field = { ...controlItem, ...registerValues };
				FIELDS[controlItem.name] = field;
			}
		});

		const setValues = (valObject = {}) => {
			Object.keys(valObject).forEach((key) => {
				setValue(key, valObject?.[key]);
			});
		};

		return { ...rest, FIELDS, getValues, control, register, setValues, setValue };
	};

	const { fields, handleSubmit, reset, watch } = useFormCogo(controlsFclFreight);
	const formValues = watch();

	fields.line_item_charge_code.options = chargeCodes;
	if (formValues?.cluster_type === 'location') {
		fields.cluster_reference_name.type = 'location-select';
		fields.cluster_reference_name.valueKey = 'port_code';
		fields.cluster_reference_name.placeholder = placeholder.cluster_reference_name?.[formValues?.cluster_type];
		fields.cluster_reference_name.itemkey = formValues?.cluster_type;
		fields.cluster_reference_name.params = { filters: { type: 'seaport' } };
		// fields.cluster_reference_name.handleChange = (obj) => {
		// 	setObjectData({ cluster_reference_name: obj });
		// };
		fields.cluster_id.optionsListKey = 'location-clusters';
		fields.cluster_id.itemkey = formValues?.cluster_reference_name;
		fields.cluster_id.key = formValues?.cluster_reference_name;
		// const reference_id = objectData?.cluster_reference_name?.id;
		// fields.cluster_id.params = formValues?.cluster_reference_name
		// 	? { filters: { location_ids: [reference_id] } }
		// 	: undefined;
	}
	if (formValues?.cluster_type === 'commodity') {
		fields.cluster_reference_name.commodityType = 'all_fcl_freight';
		fields.cluster_id.optionsListKey = 'commodity-clusters';
	}
	if (formValues?.cluster_type === 'container') {
		fields.cluster_reference_name.options = [
			{
				label : '40ft',
				value : '40',
			},
			{
				label : '40ft HC',
				value : '40HC',
			},
		];
		fields.cluster_id.options = [{ label: '40ft, 40ft HC', value: '40_40HC' }];
	}

	const onError = (errs, e) => {
		e.preventDefault();
		setErrors({ ...errs });
	};
	const handleCloseModal = () => {
		setItem(null);
		setErrors({});
		reset();
	};

	const addFclFreight = async (values, e) => {
		e.preventDefault();
		const payload = fclFreightRateFormatter({ values, item });
		const checkChargeDetails =			(values.line_item_charge_code
				&& values.gri_currency
				&& values.gri_rate)
			|| (values.line_item_charge_code === values.gri_currency
				&& values.gri_currency === values.gri_rate);
		const checkFilters =			values.shipping_line_id
			|| (values.shipping_line_id && values.service_provider_id)
			|| values.shipping_line_id === values.service_provider_id;
		try {
			if (checkFilters && checkChargeDetails) {
				const res = await trigger({
					data: { ...payload },
				});
				if (!res?.hasError) {
					if (item?.isEdit) {
						Toast.success('Updated Successfully');
					} else {
						Toast.success('Added Successfully');
					}
					if (handleOnCreate) {
						handleOnCreate();
					}
					reset();
				}
			} else {
				Toast.error('Check Your Filters or Charge Details ');
			}
		} catch (error) {
			Toast.error('Something Went Wrong!');
		}
	};

	const showElements = {
		cluster_id             : !!formValues?.cluster_reference_name,
		cluster_reference_name : !!formValues.cluster_type,
		trade_type             : formValues.cluster_type === 'location',
	};

	return {
		addFclFreight,
		loading,
		fields,
		handleSubmit,
		onError,
		errors,
		controlsFclFreight,
		handleCloseModal,
		showElements,
	};
};

export default useCreateUpdateFclFreightRateExtensions;
