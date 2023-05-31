const controls = [
	{
		label   : 'Select Filters',
		name    : 'all_filters',
		type    : 'select',
		options : [
			{ label: 'High Rating', value: 'high_rating' },
			{ label: 'Low Rating', value: 'low_rating' },
			{ label: 'Most Viewed', value: 'most_viewed' },
			{ label: 'Least Viewed', value: 'least_viewed' },
			{ label: 'High Time to Complete', value: 'high_completion' },
			{ label: 'Low Time to Complete', value: 'low_completion' },
		],
	},
];

export default controls;
