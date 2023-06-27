const NAVIGATION = 'welcome';

const API_INDEX = 0;
const FIRST_INDEX = 1;

const getCustomAuthParams = ({ permissions_navigations, URL }) => {
	const navigationData = permissions_navigations[NAVIGATION] || {};

	const apiName = URL?.split('/')?.[FIRST_INDEX] || URL;

	const apiData = navigationData?.[apiName] || [];

	return apiData[API_INDEX]?.type ? `${NAVIGATION}:${apiData[API_INDEX]?.type}` : null;
};

export default getCustomAuthParams;
