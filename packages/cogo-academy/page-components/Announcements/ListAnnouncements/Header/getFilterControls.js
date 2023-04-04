const getFilterControls = () => {
	const filters = [
		{
			name        : 'announcement_type',
			label       : 'Sort By Announcement Type',
			type        : 'select',
			placeholder : 'Select type...',
			options     : [
				{ label: 'General', value: 'general' },
				{ label: 'Tasks', value: 'tasks' },
				{ label: 'Announcement', value: 'announcement' },
				{ label: 'Product Release / Update', value: 'product_update' },
			],
		},
	];
	return filters;
};

export default getFilterControls;
