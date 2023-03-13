function getPieChartData() {
	return {
		feedback_type_chart: {
			title  : 'Feedback Type',
			colors : ['#7bc4cc', '#337b84'],
			data   : [
				{
					id    : 'address',
					label : 'Address',
					value : 60,
				},
				{
					id    : 'user_information',
					label : 'User Information',
					value : 40,
				},
			],
		},
		feedback_sub_type_chart: {
			title  : 'Feedback Sub-type',
			colors : ['#c2e4e7', '#99d1d8', '#70bfc8', '#47adb8', '#37878f', '#276066'],
			data   : [
				{
					id    : 'email',
					label : 'Email',
					value : 5,
				},
				{
					id    : 'mobile_number',
					label : 'Mobile Number',
					value : 8,
				},
				{
					id    : 'work_scopes',
					label : 'Work Scopes',
					value : 10,
				},
				{
					id    : 'address',
					label : 'Address',
					value : 15,
				},
				{
					id    : 'gstin',
					label : 'GST',
					value : 12,
				},
				{
					id    : 'others',
					label : 'Others',
					value : 20,
				},
			],
		},
	};
}
export default getPieChartData;
