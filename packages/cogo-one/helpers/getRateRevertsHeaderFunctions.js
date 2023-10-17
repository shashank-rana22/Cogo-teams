import { isEmpty, startCase } from '@cogoport/utils';

import smtRateRevertsFilter from '../configurations/smtRateRevertsFilters';
import { SOURCE_OPTIONS, DEFAULT_RATE_JOBS_FILTERS } from '../constants/rateRevertsConstants';

export function getSourceTags({
	sources = [],
	filterValues = {},
	dynamicStatistics = {},
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

	const filterTags = Object.values(filterValues).map(
		(itm) => ({
			key      : itm,
			disabled : false,
			children : startCase(itm),
			color    : 'green',
			tooltip  : false,
			closable : false,
		}) || [],
	);

	return [...filterTags, ...sourceTags];
}

export const getAppliedFilters = ({ params = {}, triggeredFrom = '' }) => {
	let filterValues = {};
	let defaultValues = {};
	let isFiltersApplied = false;

	smtRateRevertsFilter({ triggeredFrom })?.forEach(
		(itm) => {
			if (params?.[itm?.name] !== DEFAULT_RATE_JOBS_FILTERS?.[itm?.name]) {
				isFiltersApplied = true;
			}

			filterValues = {
				...filterValues,
				[itm?.name]: params?.[itm?.name],
			};

			defaultValues = {
				...defaultValues,
				[itm?.name]: DEFAULT_RATE_JOBS_FILTERS?.[itm?.name],
			};
		},
	);

	return { isFiltersApplied, filterValues, defaultValues };
};
