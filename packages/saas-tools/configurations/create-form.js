const fields = [

	{
		name        : 'shipping_line_id',
		label       : 'Shipping',
		type        : 'asyncSelect',
		placeholder : 'Enter Shipping Line',
		asyncKey    : 'shipping_lines',
		labelKey    : 'business_name',
		valueKey    : 'id',
	},
	{
		name        : 'milestone',
		label       : 'Milestone',
		type        : 'text',
		placeholder : 'Enter location code',
	},
	{
		name        : 'standard_milestone',
		label       : 'Standard Milestone',
		type        : 'text',
		placeholder : 'Enter Standard Milestone',
	},
	{
		name        : 'source',
		label       : 'Source',
		type        : 'text',
		placeholder : 'Enter Source',
	},
	{
		label       : 'Status',
		name        : 'status',
		type        : 'select',
		placeholder : 'Select Status',
		options     : [
			{ label: 'Active', value: 'active' },
			{ label: 'Inactive', value: 'inactive' },
			{ label: 'Unmapped', value: 'unmapped' },
		],
	},
	{
		label       : 'Transport Type',
		name        : 'transport_type',
		type        : 'text',
		placeholder : 'Enter Transport Type',
	},

];

const getControls = () => fields.map((control) => ({ ...control }));

export default getControls;
