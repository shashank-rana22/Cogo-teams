const CONFIG = [
	{
		label : 'Shipping Line',
		key   : 'shipping_line_id',
		type  : 'shpping_line',
		flex  : 1.4,
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
		flex  : 0.8,
	},
	{
		label : 'Status',
		key   : 'status',
		type  : 'status',
		flex  : 0.8,
	},
	{
		label : 'Transport Type',
		key   : 'transport_type',
		type  : 'status',
		flex  : 0.8,
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
