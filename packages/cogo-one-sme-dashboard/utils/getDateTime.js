import { startOfDay } from '@cogoport/utils';

import { FILTER_CONTROLS } from '../constants/analyticsConstants';

const getDateTime = ({ selectedFilter = '' }) => {
	const curr = new Date();

	if (selectedFilter === '1D') {
		return {
			startDate : startOfDay(curr),
			endDate   : new Date((curr).setHours(23, 59, 59, 999)),
			range     : FILTER_CONTROLS?.[selectedFilter]?.valueKey,
		};
	}

	if (selectedFilter === '1W') {
		return {
			startDate: startOfDay(new Date(
				curr.setDate(
					curr.getDate() - curr.getDay() + 1,
				),
			)),
			endDate: new Date((
				new Date(curr.setDate(curr.getDate() - curr.getDay() + 7))
			).setHours(23, 59, 59, 999)),
			range: FILTER_CONTROLS?.[selectedFilter]?.valueKey,
		};
	}

	if (selectedFilter === '1M') {
		return {
			startDate : startOfDay(new Date(curr.getFullYear(), curr.getMonth(), 1)),
			endDate   : new Date((
				new Date(curr.getFullYear(), curr.getMonth() + 1, 0)
			).setHours(23, 59, 59, 999)),
			range: FILTER_CONTROLS?.[selectedFilter]?.valueKey,
		};
	}

	if (selectedFilter === '6M') {
		const month = (curr.getMonth() - 5) < 0 ? curr.getMonth() + 7 : curr.getMonth() - 5;

		const year = (curr.getMonth() - 5) < 0 ? curr.getFullYear() - 1 : curr.getFullYear();

		return {
			startDate : startOfDay(new Date(year, month, 1)),
			endDate   : new Date((
				new Date(curr.getFullYear(), curr.getMonth() + 1, 0)
			).setHours(23, 59, 59, 999)),
			range: FILTER_CONTROLS?.[selectedFilter]?.valueKey,
		};
	}

	if (selectedFilter === '1Y') {
		return {
			startDate : startOfDay(new Date(curr.getFullYear(), 0, 1)),
			endDate   : new Date((
				new Date(curr.getFullYear() + 1, 0, 0)
			).setHours(23, 59, 59, 999)),
			range: FILTER_CONTROLS?.[selectedFilter]?.valueKey,
		};
	}

	return {
		startDate : startOfDay(curr),
		endDate   : new Date((curr).setHours(23, 59, 59, 999)),
		range     : FILTER_CONTROLS?.[selectedFilter]?.valueKey || 'hour',
	};
};

export default getDateTime;
