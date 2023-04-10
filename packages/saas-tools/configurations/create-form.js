const fields = [

	{
		name        : 'shipping_line_id',
		label       : 'Shpping Line',
		type        : 'text',
		placeholder : 'Enter Shpping Line',
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

];

const getControls = () => fields.map((control) => ({ ...control }));

export default getControls;
