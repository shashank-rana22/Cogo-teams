import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const FIRST_INDEX = 1;

const getCustomAuthParams = ({ permissions_navigations, in_api, currNav }) => {
	const navigationData = permissions_navigations[currNav] || {};

	const apiName = in_api?.split('/')?.[FIRST_INDEX] || in_api;

	const apiData = navigationData?.[apiName] || [];

	return apiData[GLOBAL_CONSTANTS.zeroth_index]?.view_type
		? `${currNav}:${apiData[GLOBAL_CONSTANTS.zeroth_index]?.view_type}`
		: null;
};

export default getCustomAuthParams;
