import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import { addDays } from '@cogoport/utils';

import useActiveControlsMapping from './active-controls-mapping';

const MAX_WEIGHT_SLAB = 500;
const MIN_DAYS_FOR_VALIDITY = 3;
const NEGATIVE_VALUE = 0;
const MIN_CHARGEABLE_WEIGHT = 45;
const MIN_VALUE = 0;

const useGetRevertFormControls = ({ data, chargeableWeight }) => {
	const {
		service_type,
		service_provider_id,
	} = data || {};

	const SERVICE_CONTROLS_MAPPING = useActiveControlsMapping();

	const showElements = {
		min_price    : chargeableWeight < MIN_CHARGEABLE_WEIGHT,
		weight_slabs : chargeableWeight < MAX_WEIGHT_SLAB,
	};

	const controls = [
		{
			name    : 'schedule_type',
			label   : 'Schedule Type',
			type    : 'select',
			value   : 'direct',
			options : [
				{ label: 'Transhipment', value: 'transhipment' },
				{ label: 'Direct', value: 'direct' },
			],
			placeholder : 'Select Schedule Type',
			rules       : { required: true },

		},
		{
			label       : 'Rate Provided by user',
			name        : 'sourced_by_id',
			placeholder : 'Search via name',
			controlType : 'asyncSelect',
			isClearable : true,
			valueKey    : 'user_id',
			rules       : { required: 'This is required' },
			asyncKey    : 'organization_users',
			initialCall : true,
			params      : {
				filters: {
					status          : 'active',
					organization_id : service_provider_id,

				},
			},
		},
		{
			name        : 'shipping_line_id',
			label       : 'Shipping line',
			controlType : 'asyncSelect',
			placeholder : 'Search Shipping Line',
			rules       : { required: 'Shipping Line is required' },
			asyncKey    : 'list_operators',
			params      : {
				filters    : { operator_type: 'shipping_line', status: 'active' },
				page_limit : 100,
				sort_by    : 'short_name',
				sort_type  : 'asc',
			},
			initialCall: true,
		},
		{
			name        : 'airline_id',
			type        : 'select',
			label       : 'Airline',
			controlType : 'asyncSelect',
			placeholder : 'Select Airline',
			rules       : { required: 'Airline is required' },
			asyncKey    : 'list_operators',
			params      : {
				filters    : { operator_type: 'airline', status: 'active' },
				page_limit : 100,
				sort_by    : 'short_name',
				sort_type  : 'asc',
			},
			initialCall: true,
		},
		{
			name        : 'chargeable_weight',
			label       : 'Chargeable Weight',
			controlType : 'input',
			type        : 'number',
			placeholder : 'Enter Chargeable Weight',
			rules       : { required: 'Chargeable Weight is required' },
		},
		{
			name        : 'currency',
			label       : 'Currency',
			controlType : 'select',
			options     : getCurrencyOptions(),
			placeholder : 'Select',
			rules       : { required: 'currency is required' },
		},
		{
			name        : 'price',
			label       : 'Price Per Container/Kg/Truck',
			controlType : 'input',
			type        : 'number',
			placeholder : 'Enter Price',
			rules       : { required: 'Price is required' },
		},
		{
			name        : 'advanced_amount',
			label       : 'Advanced Amount (ATH)',
			controlType : 'input',
			type        : 'number',
			placeholder : 'Enter ATH',
			rules       : { required: 'ATH is required' },
		},
		{
			name        : 'min_price',
			label       : 'Minimum Price (Per Shipment)',
			placeholder : 'Minimum Price',
			controlType : 'input',
			type        : 'number',
			rules       : {
				required : 'Minimum Price is required',
				validate : (value) => (value < NEGATIVE_VALUE ? 'Cannot be Negative' : true),
			},
		},
		{
			name        : 'price_type',
			label       : 'Price Type',
			controlType : 'select',
			options     : [
				{ label: 'All in', value: 'all_in' },
				{ label: 'Net Net', value: 'net_net' },
			],
			placeholder : 'Select Price Type',
			rules       : { required: true },
		},
		{
			name        : 'operation_type',
			placeholder : 'Operation Type',
			controlType : 'select',
			label       : 'Flight Operation Type',
			options     : [
				{
					label : 'Passenger',
					value : 'passenger',
				},
				{
					label : 'Freighter',
					value : 'freighter',
				},
				{
					label : 'Charter',
					value : 'charter',
				},
			],
			rules: {
				required: true,
			},
		},
		{
			name        : 'supplier_contract_no',
			label       : 'Supplier Contract No',
			controlType : 'input',
			placeholder : 'Contract number',
			className   : 'primary lg',
		},
		{
			name        : 'validity_end',
			label       : 'Validity End',
			controlType : 'datePicker',
			minDate     : addDays(new Date(), MIN_DAYS_FOR_VALIDITY),
			placeholder : 'Select a date',
			rules       : {
				required:
					service_type === 'air_freight_service'
					&& chargeableWeight < MAX_WEIGHT_SLAB,
			},

		},
		{
			name        : 'remarks',
			label       : 'Remarks',
			controlType : 'textarea',
			placeholder : 'Add remarks',
			className   : 'primary lg',
			rows        : 2,
		},

		{
			name        : 'rate_procurement_proof',
			label       : 'Upload Proof of Rate Procured',
			controlType : 'fileUpload',
			type        : 'file',
			drag        : true,
			maxSize     : '10485760',
			uploadType  : 'aws',
			height      : '88',
			uploadIcon  : 'ic-upload',
			accept      : '.png,.pdf,.jpg,.jpeg',
			rules       : { required: 'Upload Proof of Rate Procured is Required' },
		},
		{
			name               : 'weight_slabs',
			label              : 'Weight Slabs (in Kgs)',
			controlType        : 'fieldArray',
			showOptional       : false,
			showButtons        : false,
			noDeleteButtonTill : 1,
			defaultValues      : [
				{
					lower_limit : '',
					upper_limit : '',
				},
			],
			controls: [
				{
					name        : 'lower_limit',
					controlType : 'input',
					type        : 'number',
					placeholder : 'Lower Limit',
					span        : 4,
					rules       : {
						required : 'Lower Limit is required',
						validate : (value) => (value < MIN_VALUE ? 'Cannot be Negative' : true),
					},
				},
				{
					name        : 'upper_limit',
					controlType : 'input',
					type        : 'number',
					placeholder : 'Upper Limit',
					span        : 4,
					rules       : {
						required : 'Upper Limit is required',
						validate : (value) => (value < MIN_VALUE ? 'Cannot be Negative' : true),
					},
				},
			],
		},
	];
	const fields = controls.filter((item) => SERVICE_CONTROLS_MAPPING[service_type]?.includes(item.name));
	return { fields, showElements };
};

export default useGetRevertFormControls;
