import { isEmpty } from '@cogoport/utils';

export const getStatsParams = ({ statsFilter, service, entity }) => {
	const filtersSeperated = statsFilter?.split('-');
	const viewType = (filtersSeperated)?.shift(); // selecting the first element for year
	const year = filtersSeperated?.shift(); // selecting first year for both calender & financial year
	return {
		year,
		viewType,
		serviceTypes : !isEmpty(service) ? service : undefined,
		entityCodes  : !isEmpty(entity) ? entity : undefined,
	};
};
