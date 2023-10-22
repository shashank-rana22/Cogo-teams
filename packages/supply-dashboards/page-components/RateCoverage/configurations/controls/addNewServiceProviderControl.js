import { currencyOptions } from '../helpers/constants';

import styles from './styles.module.css';

const newServiceProvider = [
	{
		label       : 'Service Provider',
		name        : 'service_provider_id',
		placeholder : 'Service Provider',
		type        : 'async_select',
		asyncKey    : 'organizations',
		initialCall : true,
		span        : 6,
		rules       : { required: 'This is required' },
		params      : { filters: { account_type: 'service_provider', status: 'active', kyc_status: 'verified' } },
		isClearable : true,
	},
	{
		name        : 'sourced_by_id',
		label       : 'Rate Provided by user',
		type        : 'async_select',
		asyncKey    : 'organization_users',
		placeholder : 'Rate Provided by user',
		span        : 6,
		rules       : { required: 'rate provided by user is required' },
	},
	{
		label       : 'Shipping Line',
		name        : 'shipping_line_id',
		type        : 'async_select',
		placeholder : 'Search Shipping Line',
		span        : 6,
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
		label       : 'Currency',
		name        : 'currency',
		span        : 6,
		type        : 'select',
		placeholder : 'Currency',
		options     : currencyOptions,
		rules       : { required: 'Currency is required' },
	},
	{
		name        : 'price',
		label       : 'Price Per Container/Kg/Truck',
		controlType : 'input',
		type        : 'number',
		placeholder : 'Enter Price',
		span        : 6,
		rules       : { required: 'Price is required' },
	},
	{
		label   : 'Schedule Type',
		name    : 'schedule_type',
		type    : 'select',
		span    : 6,
		options : [
			{ label: 'Transhipment', value: 'transhipment' },
			{ label: 'Direct', value: 'direct' },
		],
		placeholder: 'Select Schedule Type',
	},
	{
		span        : 6,
		name        : 'supplier_contract_no',
		label       : 'Supplier Contract No',
		type        : 'text',
		placeholder : 'Contract number',
		className   : 'primary lg',
	},
	{
		label     : 'Validity End',
		name      : 'validity_end',
		type      : 'date_picker',
		className : styles.date_picker,
		span      : 6,
	},
	{
		name  : 'is_shipper_specific',
		label : 'Shipper Specific Rate',
		type  : 'checkbox',
		span  : 6,
	},
	{
		name        : 'remarks',
		label       : 'Remarks',
		type        : 'textarea',
		placeholder : 'Add remarks',
		className   : 'primary lg',
		span        : 12,
	},
];

export default newServiceProvider;
