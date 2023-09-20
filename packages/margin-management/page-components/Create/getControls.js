import serviceOptions from '../../config/SERVICE_OPTIONS.json';

const getControls = ({ type = '', marginType = '', partnerId = '', item = {} }) => {
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
			initialCall    : true,
			asyncKey       : 'partners',
			params         : { filters: { status: 'active' } },
			disabled       : type === 'edit',
			value          : item?.partner_id,

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
			rules : { required: 'Margin type is required' },
			value : item?.margin_type,
		},
		{
			label       : 'Select Rate Type',
			name        : 'rate_type',
			type        : 'chips',
			span        : 7,
			value       : item?.rate_type || 'marketplace_rate',
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
			name        : 'service',
			label       : 'Service',
			type        : 'select',
			span        : 7,
			caret       : true,
			watch       : true,
			value       : item?.service,
			disabled    : type === 'edit',
			options     : serviceOptions?.service,
			multiple    : false,
			placeholder : 'Select service',
			rules       : { required: 'Service is Required' },

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
			value: item?.organization_type,
		},
		{
			name           : 'organization_id',
			label          : 'Organization',
			defaultOptions : true,
			caret          : true,
			span           : 7,
			scope          : 'partner',
			type           : 'async_select',
			initialCall    : true,
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
			value: item?.organization_id,

		},
	];
	return controls;
};

export default getControls;
