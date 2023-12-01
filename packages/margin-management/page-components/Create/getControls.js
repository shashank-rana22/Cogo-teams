import serviceOptions from '../../config/SERVICE_OPTIONS.json';

const getControls = ({ type = '', marginType = '', partnerId = '', item = {}, setValue = () => { } }) => {
	const defaultEntityPlaceholder = type === 'edit' && !item?.partner_id ? 'ALL' : 'Select';

	const controls = [
		{
			name           : 'partner_id',
			label          : 'Cogo Entity',
			defaultOptions : true,
			caret          : true,
			span           : 2,
			watch          : true,
			initialCall    : true,
			scope          : 'partner',
			type           : 'async_select',
			asyncKey       : 'list_cogo_entity',
			labelKey       : 'business_name',
			valueKey       : 'id',
			params         : { filters: { status: 'active' } },
			disabled       : type === 'edit',
			placeholder    : defaultEntityPlaceholder,
		},
		{
			label    : 'Select Margin Type',
			name     : 'margin_type',
			type     : 'select',
			watch    : true,
			span     : 2,
			disabled : type === 'edit',
			options  : [],
			rules    : { required: 'Margin type is required' },
			value    : item?.margin_type,
		},
		{
			name        : 'service',
			label       : 'Service',
			type        : 'select',
			span        : 2,
			caret       : true,
			watch       : true,
			value       : item?.service,
			disabled    : type === 'edit',
			options     : serviceOptions?.service,
			multiple    : false,
			placeholder : 'Select service',
			rules       : { required: 'Service is Required' },
			onChange    : () => {
				setValue('rate_type', []);
			},
		},
		{
			label       : 'Select Rate Type',
			name        : 'rate_type',
			type        : 'multi_select',
			span        : 2,
			disabled    : type === 'edit',
			caret       : true,
			watch       : true,
			placeholder : 'Select Rate Type',
			rules       : { required: 'Rate type is required' },
		},
		{
			label       : 'Organization Type',
			name        : 'organization_type',
			type        : 'select',
			span        : 2,
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
			value    : item?.organization_type,
			onChange : () => {
				setValue('organization_sub_type', []);
			},
		},
		{
			label       : 'Organization Sub Type',
			name        : 'organization_sub_type',
			type        : 'multi_select',
			span        : 2,
			disabled    : type === 'edit',
			caret       : true,
			watch       : true,
			isClearable : true,
			placeholder : 'Select Organization Sub Type',
		},
		{
			name           : 'organization_id',
			label          : 'Organization',
			defaultOptions : true,
			caret          : true,
			span           : 2,
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
		{
			label    : 'Apply margin on',
			name     : 'margin_applied_on',
			type     : 'select',
			watch    : true,
			span     : 2,
			disabled : type === 'edit',
			value    : 'line_items',
			options  : [
				{ label: 'Line Items', value: 'line_items' },
				{ label: 'Service', value: 'service_wise' },
			],
			rules: { required: 'Required' },
		},
	];
	return controls;
};

export default getControls;
