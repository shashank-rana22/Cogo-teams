import Label from '../Label';
import { companyOptions } from '../utils/companyOptions';
import { stateCodeOptions } from '../utils/stateCodeOptions';

export const customerControls = [
	{
		name           : 'customer_organization',
		placeholder    : 'Select Company',
		type           : 'select',
		optionsListKey : 'trade-parties',
		labelKey       : 'business_name',
		span           : 4,
		label          : 'Customer',
		defaultOptions : true,
	},
	{
		name        : 'customer_gstin',
		placeholder : 'Type here...',
		type        : 'creatable-select',
		span        : 4,
		label       : <Label>Customer GSTIN</Label>,
	},
	{
		name        : 'customer_pan',
		placeholder : 'Type here...',
		label       : <Label required>Customer PAN</Label>,
		type        : 'text',
		span        : 4,
		rules       : {
			required: {
				value   : true,
				message : 'This is required',
			},
		},
	},
	{
		name        : 'customer_name',
		placeholder : 'Type here...',
		type        : 'creatable-select',
		span        : 4,
		label       : <Label>Customer Name</Label>,
		options     : companyOptions,
		isClearable : true,
	},
	{
		name        : 'customer_id',
		placeholder : 'Customer Id',
		type        : 'select',
		span        : 4,
		label       : <Label>Customer Id</Label>,
		disabled    : true,
	},
	{
		name         : 'customer_address',
		placeholder  : 'Type here...',
		type         : 'textarea',
		span         : 4,
		label        : 'Customer Address',
		showOptional : false,
	},
	{
		name         : 'customer_state_code',
		placeholder  : 'Select',
		type         : 'select',
		span         : 4,
		options      : stateCodeOptions,
		label        : 'Customer State Code',
		showOptional : false,
		isClearable  : true,
	},
	{
		name        : 'customer_invoice_number',
		placeholder : 'Type here...',
		label       : <Label>Customer Invoice Number</Label>,
		type        : 'text',
		span        : 4,
	},
	{
		name                  : 'customer_invoice_date',
		placeholder           : 'Type here...',
		label                 : <Label>Customer Invoice Date</Label>,
		type                  : 'datepicker',
		isPreviousDaysAllowed : true,
		span                  : 4,
	},
];
