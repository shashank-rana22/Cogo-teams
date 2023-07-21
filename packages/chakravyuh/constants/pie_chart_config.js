export const CUSTOM_THEME = {
	legends: {
		text: {
			fill       : '#828282',
			fontWeight : 500,
			fontSize   : 14,
		},
	},
	labels: {
		text: {
			fontSize: 14,
		},
	},
};

const CUMSTOM_DATA = [
	{
		key          : 'pie_chart_key_1',
		id           : 'Backend Data 1',
		label        : 'Backend Data 1',
		value        : 1211,
		color        : '#63BEC8',
		cancellation : 90,
	},
	{
		key          : 'pie_chart_key_2',
		id           : 'Backend Data 2',
		label        : 'Backend Data 2',
		value        : 1500,
		color        : '#F9AE64',
		cancellation : 70,
	},
	{
		key          : 'pie_chart_key_3',
		id           : 'Backend Data 3',
		label        : 'Backend Data 3',
		value        : 1312,
		color        : '#9BA0CB',
		cancellation : 65,
	},
	{
		key          : 'pie_chart_key_4',
		id           : 'Backend Data 4',
		label        : 'Backend Data 4',
		value        : 1312,
		color        : '#FFD700',
		cancellation : 65,
	},
];

const EXPLORED_VIEW_DATA = [
	{
		key          : 'confirmed_booking',
		id           : 'Confirmed Booking',
		label        : 'Confirmed Booking',
		value        : 1211,
		cancellation : 90,
	},
	{
		key          : 'cancelled_booking',
		id           : 'Cancelled Booking',
		label        : 'Cancelled Booking',
		value        : 1500,
		cancellation : 70,
	},
	{
		key          : 'in_progress_booking',
		id           : 'In Progress Booking',
		label        : 'In Progress Booking',
		value        : 1312,
		cancellation : 65,
	},
	{
		key          : 'completed_booking',
		id           : 'Completed Booking',
		label        : 'Completed Booking',
		value        : 1312,
		cancellation : 65,
	},
];

const ColorMappings = {
	pie_chart_key_1 : ['#63BEC8', '#BCCFD2', '#3D747A', '#7EB2B8'],
	pie_chart_key_2 : ['#F9AE64', '#FDD3AD', '#F9AE64', '#F58B33'],
	pie_chart_key_3 : ['#9BA0CB', '#C2C6E3', '#686E9F', '#A59CBE'],
	pie_chart_key_4 : ['#FFD700', '#FFFF99', '#FFF44F', '#FEBE10'],
};

export const usePieChartConfigs = (type) => {
	if (!type) {
		return {
			customData : CUMSTOM_DATA,
			pieColors  : CUMSTOM_DATA.map((item) => item.color),
		};
	}
	return {
		customData : EXPLORED_VIEW_DATA,
		pieColors  : ColorMappings[type],
	};
};
