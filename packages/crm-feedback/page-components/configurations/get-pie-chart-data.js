function getPieChartData() {
	return {
		feedback_type_chart: {
			title  : 'Feedback Type',
			colors : ['#F37166', '#ABCD62'],
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
			colors : ['#221F20', '#6FA5AB', '#ACDADF', '#88CAD1', '#F3FAFA', '#CFEAED', '#FFFFFF'],
			data   : [
				{
					id    : 'email',
					label : 'Email',
					value : 10,
				},
				{
					id    : 'mobile_number',
					label : 'Mobile Number',
					value : 10,
				},
				{
					id    : 'mobile_country_code',
					label : 'Mobile Country Code',
					value : 10,
				},
				{
					id    : 'whatsapp_number',
					label : 'Whatsapp Number',
					value : 10,
				},
				{
					id    : 'whatsapp_country_code',
					label : 'Whatsapp Country Code',
					value : 10,
				},
				{
					id    : 'alt_email',
					label : 'Alt. Email',
					value : 0,
				},
				{
					id    : 'alt_mobile_number',
					label : 'Alt. Mobile Number',
					value : 10,
				},
				{
					id    : 'work_scopes',
					label : 'Work Scopes',
					value : 10,
				},
			],
		},
	};
}
export default getPieChartData;
