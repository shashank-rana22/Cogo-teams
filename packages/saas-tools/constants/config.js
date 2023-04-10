const CONFIG = [
	{
		label : 'Shpping Line',
		key   : 'shipping_line_id',
		type  : 'shpping_line',
		flex  : 1,
	},
	{
		label : 'Milestone',
		key   : 'milestone',
		flex  : 1,
	},
	{
		label : 'Standard Milestone',
		key   : 'standard_milestone',
		flex  : 1,
	},
	{
		label : 'Source',
		key   : 'source',
		// type  : 'datetime',
		flex  : 1,
	},
	{
		label : 'Status',
		key   : 'status',
		type  : 'status',
		flex  : 1,
	},
	{
		label : '',
		key   : 'edit',
		type  : 'edit',
		flex  : 0.1,
	},
];

const getFieldsByTab = () => CONFIG;

export default getFieldsByTab;
