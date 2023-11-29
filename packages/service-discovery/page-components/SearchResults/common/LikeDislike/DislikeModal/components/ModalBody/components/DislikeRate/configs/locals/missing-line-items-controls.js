const missingLineItemsControls = () => [
	{
		label    : 'Remarks',
		type     : 'textarea',
		name     : 'has_missing_line_items.remarks',
		divWidth : '100%',
		rules    : { required: 'Remarks are required' },
	},
];

export default missingLineItemsControls;
