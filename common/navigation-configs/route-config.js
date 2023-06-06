import airRepository from './config/air-repository';
import allocations from './config/allocations';
import athenaDashboard from './config/athena-dashboard';
import authorityDesk from './config/authority-desk';
import blDoCollectionRelease from './config/bl_do-collection-release';
import bnSalvage from './config/bn-salvage';
import bookingDesk from './config/booking-desk';
import businessFinance from './config/business-finance';
import chakravyuh from './config/chakravyuh';
import cogoAcademy from './config/cogo-academy';
import cogoOne from './config/cogo-one';
import cogoVerseAnalytics from './config/cogo-verse-analytics';
import contracts from './config/contracts';
import controlledBooking from './config/controlled-booking';
import costBookingDesk from './config/cost-booking-desk';
import documentDesk from './config/document-desk';
import enrichment from './config/enrichment';
import groundOps from './config/ground-ops';
import ingestion from './config/ingestion';
import inventory_management from './config/inventory_management';
import kamDesk from './config/kam-desk';
import kamMonitoring from './config/kam-monitoring';
import lastMileDesk from './config/last-mile-desk';
import myIncident from './config/my-incident';
import myProfile from './config/my-profile';
import performanceManagement from './config/performance-management';
import referral from './config/referral';
import riskManagement from './config/risk-management';
import rolesAndPermissions from './config/roles-n-permission';
import saasSubscription from './config/saas-subscription';
import saasTools from './config/saas-tools';
import shipmentFclCfs from './config/shipment-fcl-cfs';
import shipmentFclCustom from './config/shipment-fcl-custom';
import shipmentFclFreight from './config/shipment-fcl-freight';
import shipmentFclFreightLocal from './config/shipment-fcl-freight-local';
import shipmentFtlFreight from './config/shipment-ftl-freight';
import shipmentHaulageFreight from './config/shipment-haulage-freight';
import shipmentLclFreight from './config/shipment-lcl-freight';
import shipmentLtlFreight from './config/shipment-ltl-freight';
import shipmentRailDomesticFreight from './config/shipment-rail-domestic-freight';
import so2Surface from './config/so2-surface';
import supplyDashboard from './config/supply-dashboards';
import ticketManagement from './config/ticket-management';
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
	...shipmentFclCfs,
	...shipmentLclFreight,
	...shipmentRailDomesticFreight,
	...shipmentHaulageFreight,
	...bookingDesk,
	...bnSalvage,
	...costBookingDesk,
	...authorityDesk,
	...lastMileDesk,
	...welcome,
	...referral,
	...athenaDashboard,
	...kamDesk,
	...airRepository,
	...documentDesk,
	...ingestion,
	...blDoCollectionRelease,
	...saasTools,
	...controlledBooking,
	...saasSubscription,
	...so2Surface,
	...chakravyuh,
	...riskManagement,
	...shipmentFclCustom,
	...shipmentFclFreightLocal,
	...shipmentFtlFreight,
	...shipmentLtlFreight,
	...ticketManagement,
};

export default routeConfig;
