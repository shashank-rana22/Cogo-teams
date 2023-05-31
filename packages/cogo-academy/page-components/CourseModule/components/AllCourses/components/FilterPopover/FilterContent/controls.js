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
			{ label: 'High Time to Complete', value: 'more_completion_time' },
			{ label: 'Low Time to Complete', value: 'less_completion_time' },
		],
	},
];

export default controls;
