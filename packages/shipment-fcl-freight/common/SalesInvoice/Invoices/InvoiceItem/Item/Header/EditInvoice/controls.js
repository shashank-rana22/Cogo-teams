import { isEmpty } from '@cogoport/utils';

const controls = [
	{
		name        : 'code',
		show        : false,
		label       : 'Fcl Freight Service',
		span        : 2,
		type        : 'select',
		placeholder : 'select line item',
		rules       : { required: 'Required' },
	},
	{
		span        : 2,
		type        : 'text',
		size        : 'sm',
		placeholder : 'Enter alias name/code',
		label       : (
			<>
				<div>Alias Name</div>
				{/* {info} */}
			</>
		),
		name  : 'alias',
		rules : {
			validate: (v) => v?.length >= 3 || isEmpty(v) || 'Characters should be >= 3',
		},
	},
	{
		span        : 1.5,
		type        : 'select',
		size        : 'sm',
		label       : 'Unit',
		placeholder : 'select...',
		options     : [],
		name        : 'unit',
	},
	{
		type           : 'select',
		label          : 'Currency',
		span           : 1.5,
		optionsListKey : 'currencies',
		placeholder    : 'Select Currency',
		rules          : { required: 'currency is required' },
		name           : 'currency',
		showOptional   : false,
	},
	{
		name        : 'price_discounted',
		type        : 'number',
		placeholder : 'enter price',
		span        : 1.5,
		rules       : {
			required : 'Required',
			validate : (v) => v > 0 || 'Price must be greater than 0',
		},
		label: 'Price',
	},
	{
		label       : 'Quantity',
		name        : 'quantity',
		type        : 'number',
		placeholder : 'enter quantity',
		rules       : { required: 'Required', min: 1 },
		span        : 1.5,
	},
	{
		label : 'Amount (Tax Excl.)',
		type  : 'static',
		name  : 'total',
		span  : 2,
		// render : (item) => <p className="amount-excl">{item?.total}</p>,
	},
];

export default controls;
