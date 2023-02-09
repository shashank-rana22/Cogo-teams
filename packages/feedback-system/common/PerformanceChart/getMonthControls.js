export const getMonthControls = {
	name           : 'month',
	span           : 6,
	type           : 'select',
	defaultOptions : true,
	isClearable    : true,
	placeholder    : 'Month Range...',
	options        : [
		{
			label : 'last 3 months',
			value : 90,
		},
		{
			label : 'last 6 months',
			value : 180,
		},
		{
			label : 'last 9 months',
			value : 270,
		},
	],
};
