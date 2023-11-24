const hasAdditionalLineItemsControls = () => [
	{
		label    : 'Remarks',
		type     : 'textarea',
		name     : 'has_additional_line_items.remarks',
		divWidth : '100%',
		rules    : { required: 'Remarks are required' },
	},
];

export default hasAdditionalLineItemsControls;
