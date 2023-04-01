import allocations from './config/allocations';
import businessFinance from './config/business-finance';
import cogoAcademy from './config/cogo-academy';
import cogoOne from './config/cogo-one';
import cogoVerseAnalytics from './config/cogo-verse-analytics';
import contracts from './config/contracts';
import enrichment from './config/enrichment';
import groundOps from './config/ground-ops';
import inventory_management from './config/inventory_management';
import kamMonitoring from './config/kam-monitoring';
import myIncident from './config/my-incident';
import myProfile from './config/my-profile';
import performanceManagement from './config/performance-management';
import rolesAndPermissions from './config/roles-n-permission';
import supplyDashboard from './config/supply-dashboards';
import vendorRM from './config/vendor-rm';

const routeConfig = {
	...rolesAndPermissions,
	...groundOps,
	...allocations,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...vendorRM,
	...cogoAcademy,
	...myIncident,
	...myProfile,
	...enrichment,
	...cogoVerseAnalytics,
	...cogoOne,
	...myProfile,
	...inventory_management,
	...kamMonitoring,
	...performanceManagement,
};

export default routeConfig;
