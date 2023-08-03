const controls = [
	{
		name    : 'tags',
		type    : 'chips',
		label   : 'Tags',
		options : [
			{ value: 'quotations_last_date', label: 'Quotation' },
			{ value: 'shipment_booked', label: 'Shipment Booked' },
		],
		multiple: true,
	},
	{
		name    : 'category',
		type    : 'chips',
		label   : 'Category',
		options : [
			{ value: 'daily', label: 'Daily' },
			{ value: 'weekly', label: 'Weekly' },
			{ value: 'monthly', label: 'Monthly' },
		],
		multiple: true,
	},
	{
		name    : 'status',
		type    : 'chips',
		label   : 'Status',
		options : [
			{ value: 'active', label: 'Active' },
			{ value: 'draft', label: 'Draft' },
			{ value: 'inactive', label: 'Inactive' },
		],
		multiple: true,
	},
];

export default controls;
