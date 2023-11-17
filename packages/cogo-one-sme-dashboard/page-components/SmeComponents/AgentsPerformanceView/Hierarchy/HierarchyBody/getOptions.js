import { isEmpty } from '@cogoport/utils';

import getBranchesData from '../../../../../utils/getBranchesData';
import getCountriesData from '../../../../../utils/getCountriesData';

function getOptions({
	nextViewType = '',
	hierarchyData = [],
	partnersList = [],
	leaderBoardData = {},
	userHierarchyData = {},
	loading = false,
}) {
	if (loading) {
		return [];
	}

	if (nextViewType === 'countries') {
		return getCountriesData();
	}
	if (nextViewType === 'partners') {
		return partnersList.map(
			(itm) => ({
				id           : itm?.id,
				name         : itm?.business_name,
				country_id   : itm?.country_id,
				country_code : itm?.country?.country_code,
			}),
		);
	}

	if (nextViewType === 'branches') {
		return getBranchesData({
			country_id: hierarchyData?.[hierarchyData.length - 1]?.country_id,
		});
	}

	if (nextViewType === 'managers') {
		const { list = [] } = leaderBoardData || {};

		return list.reduce(
			(acc, itm) => (
				isEmpty(itm?.user) ? acc : [...acc, itm?.user]
			),
			[],
		);
	}

	if (nextViewType === 'users') {
		const { reportees = [] } = userHierarchyData || {};

		return reportees;
	}

	return [];
}

export default getOptions;
