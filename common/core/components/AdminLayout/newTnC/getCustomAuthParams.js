const navigation = 'employee_portal';

const getCustomAuthParams = ({ permissions_navigations, url }) => {
	const navigationData = permissions_navigations[navigation] || {};

	const apiName = url.split('/')?.[1] || url;

	const apiData = navigationData?.[apiName] || [];

	return apiData[0]?.type ? `${navigation}:${apiData[0]?.type}` : null;
};

export default getCustomAuthParams;
