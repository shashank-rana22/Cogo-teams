import allocations from './config/allocations';
import announcements from './config/announcements';
import businessFinance from './config/business-finance';
import cogoAcademy from './config/cogo-academy';
import cogoOne from './config/cogo-one';
import cogoVerseAnalytics from './config/cogo-verse-analytics';
import contracts from './config/contracts';
import inventory_management from './config/inventory_management';
import kamMonitoring from './config/kam-monitoring';
import myIncident from './config/my-incident';
import myProfile from './config/my-profile';
import performanceManagement from './config/performance-management';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';

const routeConfig = {
	...rolesAndPermissions,
	...allocations,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...cogoAcademy,
	...myIncident,
	...myProfile,
	...cogoVerseAnalytics,
	...cogoOne,
	...myProfile,
	...announcements,
	...inventory_management,
	...kamMonitoring,
	...performanceManagement,
};

export default routeConfig;
