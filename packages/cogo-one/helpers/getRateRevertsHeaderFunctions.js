import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, isSameDay, startCase } from '@cogoport/utils';

import smtRateRevertsFilter from '../configurations/smtRateRevertsFilters';
import { SOURCE_OPTIONS, defaultRateJobFilters } from '../constants/rateRevertsConstants';

export function getSourceTags({
	sources = [],
	filterValues = {},
	dynamicStatistics = {},
	shipmentObj = {},
}) {
	const showStats = !isEmpty(dynamicStatistics);

	const sourceTags = sources?.map(
		(itm) => {
			const statValue = ` (${dynamicStatistics?.[itm] || 0})`;

			return {
				key      : itm,
				disabled : false,
				children : `${SOURCE_OPTIONS?.[itm]?.label}${showStats
					? statValue : ''}`,
				color    : 'green',
				tooltip  : false,
				closable : false,
			};
		},
	) || [];

	const startDate = filterValues?.dateRange?.startDate;
	const endDate = filterValues?.dateRange?.endDate;

	const showDate = isSameDay(startDate, endDate)
		? formatDate({
			date       : startDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})
		: `${formatDate({
			date       : startDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})}-${formatDate({
			date       : endDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})}`;

	const filterTags = Object.entries(filterValues)?.reduce(
		(acc, [key, itm]) => {
			if (!itm) {
				return acc;
			}
			let value = startCase(itm);

			if (key === 'shipment_id') {
				value = `SID: ${shipmentObj?.serial_id}`;
			} else if (key === 'dateRange') {
				value = showDate;
			}

			return [...acc, {
				key,
				disabled : false,
				children : value,
				color    : 'green',
				tooltip  : false,
				closable : false,
			}];
		},
		[],
	);

	return [...filterTags, ...sourceTags];
}

export const getAppliedFilters = ({ params = {}, triggeredFrom = '' }) => {
	let filterValues = {};
	let defaultValues = {};
	let isFiltersApplied = false;

	const defaultParams = defaultRateJobFilters();

	smtRateRevertsFilter({ triggeredFrom })?.forEach(
		(itm) => {
			if (itm?.name === 'dateRange') {
				const preStart = defaultParams?.dateRange?.startDate;
				const preEnd = defaultParams?.dateRange?.endDate;
				const currentStart = params?.dateRange?.startDate;
				const currentEnd = params?.dateRange?.endDate;

				isFiltersApplied = !(isSameDay(preStart, currentStart) && isSameDay(currentEnd, preEnd));
			} else if (params?.[itm?.name] !== defaultParams?.[itm?.name]) {
				isFiltersApplied = true;
			}

			filterValues = {
				...filterValues,
				[itm?.name]: params?.[itm?.name],
			};

			defaultValues = {
				...defaultValues,
				[itm?.name]: defaultParams?.[itm?.name],
			};
		},
	);

	return { isFiltersApplied, filterValues, defaultValues };
};
