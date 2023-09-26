import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const controls = ({
	setValue = () => {},
	setSubCategories = () => {},
	formattedSubCategories = [],
	categoryDeskOptions,
}) => ([
	{
		label       : 'Request Type',
		placeholder : 'Select Request Type',
		name        : 'request_type',
		type        : 'select',
		rules       : { required: true },
		value       : 'shipment',
		options     : [
			{ label: 'Shipment', value: 'shipment' },
			{ label: 'Rate', value: 'rate' },
			{ label: 'Finance', value: 'finance' },
			{ label: 'Platform Issue', value: 'platform_issue' },
		],
	},
	{
		label       : 'Select SID',
		placeholder : 'Select Select SID',
		name        : 'serial_id',
		type        : 'async-select',
		asyncKey    : 'list_shipments',
		rules       : { required: true },
		onChange    : (_, obj) => {
			setValue('service', obj?.shipment_type);
			setValue('trade_type', obj?.trade_type);
		},
	},
	{
		label       : 'Select Service ',
		placeholder : 'Select Service',
		name        : 'service',
		type        : 'select',
		options     : GLOBAL_CONSTANTS.shipment_types,
		rules       : { required: true },
		disabled    : true,
	},
	{
		label       : 'Select Trade Type',
		placeholder : 'Select Trade Type',
		name        : 'trade_type',
		type        : 'select',
		disabled    : true,
		options     : GLOBAL_CONSTANTS.trade_types,
		rules       : { required: true },
	},
	{
		...(categoryDeskOptions || {}),
		label       : 'Raised By Desk',
		placeholder : 'Select Trade Type',
		name        : 'category',
		rules       : { required: true },
		onChange    : (_, val) => {
			setSubCategories(val?.subcategories);
			// resetField('sub_category');
		},
	},
	{
		label       : 'Raised To Desk',
		placeholder : 'Select Trade Type',
		name        : 'sub_category',
		type        : 'select',
		rules       : { required: true },
		options     : formattedSubCategories,
	},
	{
		label       : 'Select issue type',
		placeholder : 'Select Trade Type',
		name        : 'request_type',
		type        : 'select',
		rules       : { required: true },
		value       : 'shipment',
		options     : [
			{ label: 'Shipment', value: 'shipment' },
			{ label: 'Rate', value: 'rate' },
			{ label: 'Finance', value: 'finance' },
			{ label: 'Platform Issue', value: 'platform_issue' },
		],
	},
	{
		label       : 'Describe Issue',
		placeholder : 'Enter Comments',
		name        : 'describe_issue',
		type        : 'textarea',
		rules       : { required: true },
		options     : [
			{ label: 'Shipment', value: 'shipment' },
			{ label: 'Rate', value: 'rate' },
			{ label: 'Finance', value: 'finance' },
			{ label: 'Platform Issue', value: 'platform_issue' },
		],
	},
	{
		name       : 'supporting_document',
		span       : 12,
		type       : 'file',
		themeType  : 'secondary',
		drag       : true,
		label      : 'Upload Supporting Document',
		uploadType : 'aws',
	},
]);

export default controls;
