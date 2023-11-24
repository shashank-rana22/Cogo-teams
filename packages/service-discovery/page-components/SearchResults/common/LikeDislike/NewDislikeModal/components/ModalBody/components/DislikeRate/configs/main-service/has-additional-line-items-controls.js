const hasAdditionalLineItemsControls = () => [
	{
		label    : 'Remarks',
		type     : 'textarea',
		name     : 'has_additional_line_items.remarks',
		rules    : { required: 'Remarks are required' },
		divWidth : '100%',
	},
];

export default hasAdditionalLineItemsControls;
