const hasAdditionalLineItemsControls = () => [
	{
		label    : 'Remarks',
		type     : 'textarea',
		name     : 'has_additional_line_items.remarks',
		span     : 12,
		rules    : { required: 'Remarks are required' },
		divWidth : '100%',
	},
];

export default hasAdditionalLineItemsControls;
