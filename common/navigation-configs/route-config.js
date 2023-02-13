import businessFinance from './config/business-finance';
import cogoVerseAnalytics from './config/cogo-verse-analytics';
import rolesAndPermissions from './config/roles-n-permission';

const routeConfig = {
	...rolesAndPermissions,
	...businessFinance,
	...cogoVerseAnalytics,
};

export default routeConfig;
