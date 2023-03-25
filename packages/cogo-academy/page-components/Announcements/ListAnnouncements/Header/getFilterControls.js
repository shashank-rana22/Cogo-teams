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
			],
		},
		{
			name        : 'status',
			label       : 'Sort by Status',
			type        : 'select',
			placeholder : 'Select status...',
			options     : [
				{ label: 'Live', value: 'active' },
				{ label: 'Draft', value: 'draft' },
			],
		},
	];
	return filters;
};

export default getFilterControls;
