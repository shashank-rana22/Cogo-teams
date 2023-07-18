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
		key          : 'supply_rates',
		id           : 'Supply Rates',
		label        : 'Supply Rates',
		value        : 1211,
		color        : '#63BEC8',
		cancellation : 90,
	},
	{
		key          : 'predicted_rates',
		id           : 'Predicted Rates',
		label        : 'Predicted Rates',
		value        : 1500,
		color        : '#F9AE64',
		cancellation : 70,
	},
	{
		key          : 'supply_transformed_rates',
		id           : 'Supply Transformed Rates',
		label        : 'Supply Transformed Rates',
		value        : 1312,
		color        : '#9BA0CB',
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
	supply_rates             : ['#63BEC8', '#BCCFD2', '#3D747A', '#7EB2B8'],
	predicted_rates          : ['#F9AE64', '#FDD3AD', '#F9AE64', '#F58B33'],
	supply_transformed_rates : ['#9BA0CB', '#C2C6E3', '#686E9F', '#A59CBE'],
};

export const usePieChartConfigs = (type) => {
	if (type === 'default') {
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
