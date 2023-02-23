import allocations from './config/allocations';
import businessFinance from './config/business-finance';
import cogoVerseAnalytics from './config/cogo-verse-analytics';
import contracts from './config/contracts';
import myIncident from './config/my-incident';
import myProfile from './config/my-profile';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...rolesAndPermissions,
	...allocations,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...myIncident,
	...myProfile,
	...cogoVerseAnalytics,
};

export default routeConfig;
