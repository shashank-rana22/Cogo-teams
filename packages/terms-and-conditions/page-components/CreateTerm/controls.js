import { isEmpty } from '@cogoport/utils';

const getTncControls = ({ values = {} }) => {
	const {
		service,
		trade_type,
		country_id,
		shipping_line_id,
		airline_id,
		paying_party_country_ids,
		description,
	} = values;

	let newDesc = [
		{
			terms_and_condition: '',
		},
	];
	if (!isEmpty(description)) {
		newDesc = description.map((item) => ({
			terms_and_condition: item,
		}));
	}
	return [
		{
			name           : 'service',
			label          : 'Service Type',
			controllerType : 'select',
			value          : service || 'fcl_freight',
			className      : 'primary lg',
			options        : [
				{ label: 'FCL', value: 'fcl_freight' },
				{ label: 'LCL', value: 'lcl_freight' },
				{ label: 'AIR', value: 'air_freight' },
				{ label: 'FTL', value: 'ftl_freight' },
				{ label: 'LTL', value: 'ltl_freight' },
				{ label: 'Trailer', value: 'trailer_freight' },
				{ label: 'Haulage', value: 'haulage_freight' },
				// { label: 'Rails Domestic', value: 'rail_domestic_freight' },
				{ label: 'FCL Customs', value: 'fcl_customs' },
				{ label: 'LCL Customs', value: 'lcl_customs' },
				{ label: 'Air Customs', value: 'air_customs' },
				{ label: 'FCL Locals', value: 'fcl_freight_local' },
				{ label: 'LCL Locals', value: 'lcl_freight_local' },
				{ label: 'Air Locals', value: 'air_freight_local' },
			],
			span  : 6,
			rules : { required: true },
		},
		{

			name           : 'shipping_line_id',
			label          : 'Shipping Line',
			controllerType : 'select',
			className      : 'primary lg',
			value          : shipping_line_id,
			placeholder    : 'Select Shipping Line',
			optionsListKey : 'shipping-lines',
			defaultOptions : true,
			cacheOptions   : false,
			span           : 6,
			isClearable    : true,
		},
		{

			name           : 'airline_id',
			label          : 'Airline',
			controllerType : 'select',
			className      : 'primary lg',
			value          : airline_id,
			placeholder    : 'Select Airline',
			optionsListKey : 'air-lines',
			defaultOptions : true,
			span           : 6,
			isClearable    : true,
			cacheOptions   : false,
		},
		{
			name           : 'trade_type',
			label          : 'Trade Type',
			controllerType : 'select',
			value          : trade_type,
			placeholder    : 'Select Trade Type',
			className      : 'primary lg',
			options        : [],
			span           : 6,
			isClearable    : true,
		},
		{

			name           : 'country_id',
			label          : 'Country',
			controllerType : 'select',
			placeholder    : 'Select Country Name',
			optionsListKey : 'locations',
			className      : 'primary lg',
			value          : country_id,
			span           : 6,
			params         : { filters: { type: ['country'] } },
		},

		{
			name           : 'paying_party_country_ids',
			label          : 'Paying Party Country',
			controllerType : 'async-select',
			optionsListKey : 'locations',
			placeholder    : 'Select Country Name',
			value          : paying_party_country_ids,
			params         : { filters: { type: ['country'] } },
			span           : 4,
			multiple       : true,
		},
		{
			name           : 'description',
			controllerType : 'fieldArray',
			className      : 'primary lg',
			showAddIcon    : false,
			showLabelOnce  : true,
			buttonText     : 'Add more',
			buttonTheme    : 'admin',
			buttonStyles   : {
				textTransform : 'capitalize',
				padding       : '4px 8px',
			},
			buttonClassName    : 'secondary md',
			noDeleteButtonTill : 1,
			value              : newDesc,
			controls           : [
				{
					name        : 'terms_and_condition',
					label       : 'Terms And Conditions',
					type        : 'textarea',
					span        : 11,
					placeholder : 'Type Terms And Conditions here',
					rules       : { required: true },
				},
			],
		},
	];
};

export default getTncControls;
