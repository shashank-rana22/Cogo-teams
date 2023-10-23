import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, isSameDay, startCase } from '@cogoport/utils';

import smtRateRevertsFilters from '../configurations/smtRateRevertsFilters';
import { ADMIN_VIEW_REQUIRED_FOR, SOURCE_OPTIONS, defaultRateJobFilters } from '../constants/rateRevertsConstants';

export function getSourceTags({
	sources = [],
	filterValues = {},
	dynamicStatistics = {},
	viewType = '',
	filtersData = {},
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
		})} to ${formatDate({
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

			if (key === 'shipment_serial_id') {
				value = `SID: ${filterValues?.shipment_serial_id}`;
			} else if (key === 'dateRange') {
				value = showDate;
			} else if (key === 'service_provider_id') {
				const serviceProviderData = filtersData?.service_provider_id || {};
				value = serviceProviderData?.short_name
							|| serviceProviderData?.business_name
							|| serviceProviderData?.name;
			}

			if (key === 'relevant_to') {
				if (ADMIN_VIEW_REQUIRED_FOR.includes(viewType)) {
					value = `Relevant To ${startCase(itm)}`;
				} else {
					return acc;
				}
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

export const getAppliedFilters = ({ params = {}, triggeredFrom = '', viewType = '' }) => {
	let filterValues = {};
	let defaultValues = {};
	let isFiltersApplied = false;

	const defaultParams = defaultRateJobFilters({ viewType });

	smtRateRevertsFilters({ triggeredFrom, viewType })?.forEach(
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
