import { asyncFieldsOperators, asyncFieldsOrganizationUsers, useGetAsyncOptions } from '@cogoport/forms';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import { addDays } from '@cogoport/utils';

const MIN_DAYS_FOR_VALIDITY = 3;
const NEGATIVE_VALUE = 0;

const SERVICE_CONTROLS_MAPPING = {
	fcl_freight_service: ['sourced_by_id', 'shipping_line_id', 'validity_end', 'remarks', 'currency', 'price',
		'supplier_contract_no'],
	lcl_freight_service     : ['sourced_by_id', 'validity_end', 'remarks', 'currency', 'price', 'supplier_contract_no'],
	air_freight_service     : [],
	ltl_freight_service     : [],
	ftl_freight_service     : [],
	haulage_freight_service : [],
	trailer_freight_service : [],
	air_customs_service     : [],
	fcl_customs_service     : [],
};

const useGetRevertFormControls = ({ data }) => {
	const { service_type, service_provider_id } = data || {};

	const organizationUsers = useGetAsyncOptions({
		...asyncFieldsOrganizationUsers(),
		initialCall : true,
		params      : {
			filters: {
				status          : 'active',
				organization_id : service_provider_id,

			},
		},
	});

	const shippingLines = useGetAsyncOptions({
		...asyncFieldsOperators(),
		params: {
			filters     : { operator_type: 'shipping_line', status: 'active' },
			page_limit  : 100,
			sort_by     : 'short_name',
			sort_type   : 'asc',
			initialCall : true,
		},
	});

	const airLines = useGetAsyncOptions({
		...asyncFieldsOperators(),
		params: {
			filters    : { operator_type: 'airline', status: 'active' },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	});

	const controls = [
		{
			label       : 'Rate Provided by user',
			name        : 'sourced_by_id',
			placeholder : 'Search via name',
			controlType : 'select',
			isClearable : true,
			valueKey    : 'user_id',
			rules       : { required: 'This is required' },
			...organizationUsers,
		},
		{
			name        : 'shipping_line_id',
			label       : 'Shipping line',
			controlType : 'select',
			placeholder : 'Search Shipping Line',
			rules       : { required: 'Shipping Line is required' },
			...shippingLines,
		},
		{
			name        : 'airline_id',
			type        : 'select',
			label       : 'Airline',
			placeholder : 'Select Airline',
			rules       : { required: 'Airline is required' },
			...airLines,
		},
		{
			name        : 'chargeable_weight',
			label       : 'Chargeable Weight',
			controlType : 'input',
			type        : 'number',
			placeholder : 'Enter Chargeable Weight',
			value       : 0,
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

		},
		{
			name        : 'remarks',
			label       : 'Remarks',
			controlType : 'textarea',
			placeholder : 'Add remarks',
			className   : 'primary lg',
			rows        : 2,
		},
	];

	return controls.filter((item) => SERVICE_CONTROLS_MAPPING[service_type]?.includes(item.name));
};

export default useGetRevertFormControls;
