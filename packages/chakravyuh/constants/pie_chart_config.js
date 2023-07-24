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
		key          : 'manual',
		id           : 'Supply Rates',
		label        : 'Supply Rates',
		value        : 1211,
		color        : '#63BEC8',
		cancellation : 90,
	},
	{
		key          : 'predicted',
		id           : 'Predicted Rate',
		label        : 'Predicted Rate',
		value        : 1500,
		color        : '#F9AE64',
		cancellation : 70,
	},
	{
		key          : 'rate_extension',
		id           : 'Extended Rates',
		label        : 'Extended Rates',
		value        : 1312,
		color        : '#9BA0CB',
		cancellation : 65,
	},
	{
		key          : 'cluster_rate_extension',
		id           : 'Cluster Rate Extension',
		label        : 'Cluster Rate Extension',
		value        : 1312,
		color        : '#58D3FE',
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
	manual                 : ['#63BEC8', '#BCCFD2', '#3D747A', '#7EB2B8'],
	predicted              : ['#F9AE64', '#FDD3AD', '#F9AE64', '#F58B33'],
	rate_extension         : ['#9BA0CB', '#C2C6E3', '#686E9F', '#A59CBE'],
	cluster_rate_extension : ['#58D3FE', '#9CEBFE', '#87CEEB', '#ADD8E6'],
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
