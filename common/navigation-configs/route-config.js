import airRepository from './config/air-repository';
import allocations from './config/allocations';
import athenaDashboard from './config/athena-dashboard';
import authorityDesk from './config/authority-desk';
import bookingDesk from './config/booking-desk';
import businessFinance from './config/business-finance';
import cogoAcademy from './config/cogo-academy';
import cogoOne from './config/cogo-one';
import cogoVerseAnalytics from './config/cogo-verse-analytics';
import contracts from './config/contracts';
import costBookingDesk from './config/cost-booking-desk';
import documentDesk from './config/document-desk';
import enrichment from './config/enrichment';
import groundOps from './config/ground-ops';
import ingestion from './config/ingestion';
import inventory_management from './config/inventory_management';
import kamMonitoring from './config/kam-monitoring';
import lastMileDesk from './config/last-mile-desk';
import myIncident from './config/my-incident';
import myProfile from './config/my-profile';
import performanceManagement from './config/performance-management';
import rolesAndPermissions from './config/roles-n-permission';
import shipmentFclFreight from './config/shipment-fcl-freight';
import supplyDashboard from './config/supply-dashboards';
import vendorRM from './config/vendor-rm';
import welcome from './config/welcome';

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
	...shipmentFclFreight,
	...bookingDesk,
	...costBookingDesk,
	...authorityDesk,
	...lastMileDesk,
	...welcome,
	...athenaDashboard,
	...airRepository,
	...documentDesk,
	...ingestion,
};

export default routeConfig;
