import { VIEW_MAPPING } from '../constants/IDS_CONSTANTS';

const getViewType = (userRoleIds = []) => {
	let view = '';
	Object.keys(VIEW_MAPPING).some((eachView) => {
		if (userRoleIds?.some((eachRole) => VIEW_MAPPING[eachView].includes(eachRole))) {
			view = eachView;
			return true;
		}
		return false;
	});
	return view;
};
export default getViewType;
