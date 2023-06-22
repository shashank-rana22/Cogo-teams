import getViewTypeMapping from '../constants/IDS_CONSTANTS';

const ROLE_FUNC_ACESS_MAPPING = ['supply'];

const getViewType = ({ userRoleIds = [], userId, authRoleData }) => {
	const {
		USER_IDS_CHECK, ROLE_IDS_CHECK,
	} = getViewTypeMapping();

	const userView = Object.keys(USER_IDS_CHECK).find(
		(eachView) => USER_IDS_CHECK[eachView].includes(userId),
	) || null;

	if (userView) {
		return userView;
	}

	const roleView = Object.keys(ROLE_IDS_CHECK).find(
		(eachView) => userRoleIds?.some((eachRole) => ROLE_IDS_CHECK[eachView].includes(eachRole)),
	) || null;

	if (roleView) {
		return roleView;
	}

	const matchedRoleFunc = ROLE_FUNC_ACESS_MAPPING.find(
		(eachRole) => authRoleData?.role_functions?.includes(eachRole),
	);

	if (matchedRoleFunc) {
		return `${matchedRoleFunc}_view`;
	}

	return null;
};
export default getViewType;
