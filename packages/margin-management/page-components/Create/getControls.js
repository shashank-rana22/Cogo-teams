const getControls = ({ type = '', marginType = '', partnerId = '' }) => {
	const controls = [
		{
			name           : 'partner_id',
			label          : 'Partner',
			defaultOptions : true,
			caret          : true,
			span           : 7,
			watch          : true,
			scope          : 'partner',
			type           : 'async_select',
			asyncKey       : 'partners',
			params         : { filters: { status: 'active' } },
			disabled       : type === 'edit',
			style          : {
				control: (base) => ({
					...base,
					'&:disabled': { cursor: 'not-allowed', opacity: '0.6' },
				}),
			},
		},
		{
			label    : 'Select Margin Type',
			name     : 'margin_type',
			type     : 'radio',
			watch    : true,
			span     : 7,
			disabled : type === 'edit',
			options  : [
				{ label: 'Sales', value: 'demand' },
				{ label: 'Supply', value: 'supply' },
				{ label: 'Cogoport', value: 'cogoport' },
			],
			rules: { required: 'Margin type is required' },
		},
		{
			label       : 'Select Rate Type',
			name        : 'rate_type',
			type        : 'chips',
			span        : 7,
			value       : 'marketplace_rate',
			disabled    : type === 'edit',
			caret       : true,
			watch       : true,
			multiple    : false,
			placeholder : 'Select Rate Type',
			options     : [
				{ label: 'Marketplace Rate', value: 'marketplace_rate' },
				{ label: 'Cogo Assured Rate', value: 'cogo_assured_rate' },
			],
			rules: { required: 'Rate type is required' },
		},

		{
			name     : 'service',
			label    : 'Service',
			type     : 'select',
			span     : 7,
			caret    : true,
			watch    : true,
			disabled : type === 'edit',
			options  : [
				{
					label : 'FCL FREIGHT',
					value : 'fcl_freight',
				},
				{
					label : 'FTL FREIGHT',
					value : 'ftl_freight',
				},
				{
					label : 'HAULAGE FREIGHT',
					value : 'haulage_freight',
				},
				{
					label : 'FCL CUSTOMS',
					value : 'fcl_customs',
				},
				{
					label : 'AIR FREIGHT',
					value : 'air_freight',
				},
				{
					label : 'AIR CUSTOMS',
					value : 'air_customs',
				},
				{
					label : 'LCL FREIGHT',
					value : 'lcl_freight',
				},
				{
					label : 'LCL CUSTOMS',
					value : 'lcl_customs',
				},
				{
					label : 'LTL FREIGHT',
					value : 'ltl_freight',
				},
				{
					label : 'FCL CFS',
					value : 'fcl_cfs',
				},
				{
					label : 'FCL FREIGHT LOCAL',
					value : 'fcl_freight_local',
				},
				{
					label : 'LCL FREIGHT LOCAL',
					value : 'lcl_freight_local',
				},
			],
			multiple    : false,
			placeholder : 'Select service',
			rules       : { required: 'Service is Required' },
			style       : {
				control: (base) => ({
					...base,
					'&:focus-within' : { boxShadow: 'none', borderColor: '#e0e0e0' },
					'&:hover'        : { borderColor: '#333' },
					'&:disabled'     : { cursor: 'not-allowed', opacity: '0.6' },
				}),
			},
		},
		{
			label       : 'Organization Type',
			name        : 'organization_type',
			type        : 'select',
			span        : 7,
			disabled    : type === 'edit',
			caret       : true,
			watch       : true,
			multiple    : false,
			isClearable : true,
			placeholder : 'Select Organization Type',
			options     : [
				{ label: 'Importer Exporter', value: 'importer_exporter' },
				{ label: 'Channel Partner', value: 'channel_partner' },
			],
		},
		{
			name           : 'organization_id',
			label          : 'Organization',
			defaultOptions : true,
			caret          : true,
			span           : 7,
			scope          : 'partner',
			type           : 'async_select',
			watch          : true,
			asyncKey       : 'organizations',
			disabled       : type === 'edit',
			params         : {
				filters: {
					status     : 'active',
					kyc_status : 'verified',
					account_type:
					marginType === 'supply' ? 'service_provider' : 'importer_exporter',
					partner_id: partnerId || undefined,
				},
			},
			style: {
				control: (base) => ({
					...base,
					'&:disabled': { cursor: 'not-allowed', opacity: '0.6' },
				}),
			},
		},
	];
	const DEFAULT_VALUES = controls.map((item) => ({ [item.name]: '' }));
	return { controls, DEFAULT_VALUES };
};

export default getControls;
