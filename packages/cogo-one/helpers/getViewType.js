import { VIEW_MAPPING } from '../constants/IDS_CONSTANTS';

const getViewType = (userRoleIds = []) => Object.keys(VIEW_MAPPING).find(
	(eachView) => userRoleIds?.some((eachRole) => VIEW_MAPPING[eachView].includes(eachRole)),
) || null;

export default getViewType;
