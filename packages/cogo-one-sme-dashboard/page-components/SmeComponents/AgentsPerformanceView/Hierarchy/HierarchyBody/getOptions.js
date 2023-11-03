import getBranchesData from '../../../../../utils/getBranchesData';
import getCountriesData from '../../../../../utils/getCountriesData';

function getOptions({
	nextViewType = '',
	hierarchyData = [],
	partnersList = [],
}) {
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

	return [];
}

export default getOptions;
