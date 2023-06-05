import getViewTypeMapping from '../constants/IDS_CONSTANTS';

const getViewType = (userRoleIds = []) => {
	const VIEW_MAPPING = getViewTypeMapping();

	return Object.keys(VIEW_MAPPING).find(
		(eachView) => userRoleIds?.some((eachRole) => VIEW_MAPPING[eachView].includes(eachRole)),
	) || null;
};
export default getViewType;
