import { useForm } from '@cogoport/forms';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';
import { useImperativeHandle, forwardRef } from 'react';

import Layout from '../../../../../common/Layout';
import useGetChargeCodes from '../../../../../hooks/useGetChargeCodes';

import getControls from './getControls';

const PLACEHOLDER = {
	cluster_reference_name: {
		location  : 'Please search location...',
		commodity : 'Please search commodity...',
		container : 'Please search container type',
	},
};

function Form({ item = {}, handleSubmitForm = () => {} }, ref) {
	const DEFAULT_VALUES = {};

	const { list: chargeCodes } = useGetChargeCodes({});

	const controls = getControls({ item });

	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const { control, formState:{ errors = {} } = {}, watch, handleSubmit } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const {
		cluster_type = '',
		cluster_reference_name = '',
	} = watch();

	controls.forEach((_c, index) => {
		if (controls[index]?.name === 'line_item_charge_code' && chargeCodes) {
			controls[index].options = chargeCodes;
		}

		if (cluster_type === 'location') {
			if (controls[index]?.name === 'cluster_reference_name' && cluster_type) {
				controls[index].type = 'async_select';
				controls[index].valueKey = 'port_code';
				controls[index].placeholder = PLACEHOLDER.cluster_reference_name.cluster_type;
				controls[index].asyncKey = 'list_locations';
				controls[index].itemkey = cluster_type;
				controls[index].params = { filters: { type: 'seaport' } };
			}

			if (controls[index]?.name === 'cluster_id' && cluster_reference_name) {
				controls[index].asyncKey = 'list_location_clusters';
				controls[index].type = 'async_select';
				controls[index].itemkey = cluster_reference_name;
				controls[index].key = cluster_reference_name;
			}
		}

		if (cluster_type === 'commodity') {
			if (controls[index]?.name === 'cluster_reference_name') {
				controls[index].commodityType = 'all_fcl_freight';
				controls[index].options = getCommodityList('freight');
			}

			if (controls[index]?.name === 'cluster_id') {
				controls[index].asyncKey = 'commodity_clusters';
				controls[index].type = 'async_select';
			}
		}

		if (cluster_type === 'container') {
			if (controls[index]?.name === 'cluster_reference_name') {
				controls[index].options = [
					{
						label : '40ft',
						value : '40',
					},
					{
						label : '40ft HC',
						value : '40HC',
					},
				];
			}

			if (controls[index]?.name === 'cluster_id') {
				controls[index].options = [{ label: '40ft, 40ft HC', value: '40_40HC' }];
			}
		}
	});

	const onSubmit = (values) => handleSubmitForm({ data: values, item });

	const showElements = {
		cluster_id             : !!cluster_reference_name,
		cluster_reference_name : !!cluster_type,
		trade_type             : cluster_type === 'location',
	};

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit)();
		},
	}));

	return (
		<Layout
			controls={controls}
			errors={errors}
			control={control}
			formValues={watch()}
			showElements={showElements}
		/>
	);
}

export default forwardRef(Form);
