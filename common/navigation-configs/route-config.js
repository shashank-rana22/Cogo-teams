import allocations from './config/allocations';
import bookingDesk from './config/booking-desk';
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
import shipmentFclFreight from './config/shipment-fcl-freight';
import supplyDashboard from './config/supply-dashboards';
import unifiedDashboard from './config/unified-dashboard';
import vendorRM from './config/vendor-rm';
import welcome from './config/welcome';

const routeConfig = {
	...rolesAndPermissions,
	...groundOps,
	...allocations,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...unifiedDashboard,
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
	...shipmentFclFreight,
	...bookingDesk,
	...welcome,
};

export default routeConfig;
