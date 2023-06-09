const NAVIGATION = 'employee_portal';

const API_INDEX = 0;
const FIRST_INDEX = 1;

const getCustomAuthParams = ({ permissions_navigations, url }) => {
	const navigationData = permissions_navigations[NAVIGATION] || {};

	const apiName = url.split('/')?.[FIRST_INDEX] || url;

	const apiData = navigationData?.[apiName] || [];

	return apiData[API_INDEX]?.type ? `${NAVIGATION}:${apiData[API_INDEX]?.type}` : null;
};

export default getCustomAuthParams;
