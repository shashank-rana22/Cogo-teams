import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { snakeCaseToTitleCase } from '../utils/snakeCaseToTitleCase';

const FIRST = 1;

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

const EXPLORED_VIEW_DATA = [
	{
		key          : 'shipment_confirmed_by_service_provider_count',
		id           : 'Confirmed Booking',
		label        : 'Confirmed Booking',
		cancellation : 'shipment_confirmed_by_service_provider_percentage',
	},
	{
		key          : 'shipment_cancelled_count',
		id           : 'Cancelled Booking',
		label        : 'Cancelled Booking',
		cancellation : 'shipment_cancelled_percentage',
	},
	{
		key          : 'shipment_in_progress_count',
		id           : 'In Progress Booking',
		label        : 'In Progress Booking',
		cancellation : 'shipment_in_progress_percentage',
	},
	{
		key          : 'shipment_completed_count',
		id           : 'Completed Booking',
		label        : 'Completed Booking',
		cancellation : 'shipment_completed_percentage',
	},
];

const ColorMappings = {
	supply_rates      : ['#63BEC8', '#BCCFD2', '#3D747A', '#7EB2B8'],
	predicted         : ['#F9AE64', '#FDD3AD', '#F9AE64', '#F58B33'],
	rate_extension    : ['#9BA0CB', '#C2C6E3', '#686E9F', '#A59CBE'],
	cluster_extension : ['#58D3FE', '#9CEBFE', '#87CEEB', '#ADD8E6'],
};

export const usePieChartConfigs = (type, data) => {
	const pieChartData = Object.entries(data).flatMap((obj) => {
		const objKey = obj[GLOBAL_CONSTANTS.zeroth_index];
		const objLabel = snakeCaseToTitleCase(objKey);
		if (objKey === 'total_rates') return [];
		return {
			key          : objKey,
			id           : objLabel,
			label        : objLabel,
			value        : obj[FIRST].value,
			cancellation : obj[FIRST].shipment_cancelled_percentage,
		};
	});

	if (!type) {
		return {
			pieChartData,
			pieColors: Object.keys(data).flatMap((key) => {
				if (key !== 'total_rates') return ColorMappings[key][GLOBAL_CONSTANTS.zeroth_index];
				return [];
			}),
		};
	}
	return {
		pieChartData: [...Object.entries(data).flatMap((obj) => {
			if (obj[GLOBAL_CONSTANTS.zeroth_index] === type) {
				return EXPLORED_VIEW_DATA.map((entry) => ({
					...entry,
					value        : obj[FIRST][entry.key],
					cancellation : obj[FIRST][entry.cancellation],
				}));
			}
			return [];
		})],
		pieColors: ColorMappings[type],
	};
};
