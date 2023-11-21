import { isEmpty } from '@cogoport/utils';

import { COGO_PARTNER_LIST } from '../../../../../constants/cogoPartnersList';
import getBranchesData from '../../../../../utils/getBranchesData';
import getCountriesData from '../../../../../utils/getCountriesData';

function getOptions({
	nextViewType = '',
	hierarchyData = [],
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
		return COGO_PARTNER_LIST.map(
			(itm) => ({
				id           : itm?.partnerId,
				name         : itm?.label,
				country_id   : itm?.countryId,
				country_code : itm?.countryCode,
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
