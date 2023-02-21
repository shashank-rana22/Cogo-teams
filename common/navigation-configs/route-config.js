import businessFinance from './config/business-finance';
import cogoOne from './config/cogo-one';
import cogoVerseAnalytics from './config/cogo-verse-analytics';
import contracts from './config/contracts';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...rolesAndPermissions,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...cogoOne,
	...cogoVerseAnalytics,
};

export default routeConfig;
