export const getlineItemControls = ({ lineItems }) => {
	const controls = [
		{
			name        : 'line_item',
			label       : 'Line Item',
			type        : 'select',
			span        : 12,
			options     : lineItems,
			placeholder : 'line Item',
			watch       : true,
			rules       : { required: 'This is Required' },
		},
		{
			name        : 'name',
			label       : 'Alias Name',
			type        : 'text',
			placeholder : 'Alias Name',
			span        : 12,
			watch       : true,
			rules       : { required: 'This is Required' },
		},
	];

	return controls;
};
