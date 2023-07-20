import airRepository from './config/air-repository';
import airlinePluginBooking from './config/airline-booking-plugin';
import allocations from './config/allocations';
import authorityDesk from './config/authority-desk';
import awbInventory from './config/awb-inventory';
import blDoCollectionRelease from './config/bl_do-collection-release';
import bnSalvage from './config/bn-salvage';
import bookingDesk from './config/booking-desk';
import bookingDeskAir from './config/booking-desk-air';
import businessFinance from './config/business-finance';
import chakravyuh from './config/chakravyuh';
import chro from './config/chro';
import cogoAcademy from './config/cogo-academy';
import cogoOne from './config/cogo-one';
import cogoVerseAnalytics from './config/cogo-verse-analytics';
import contracts from './config/contracts';
import controlledBooking from './config/controlled-booking';
import costBookingDesk from './config/cost-booking-desk';
import documentDesk from './config/document-desk';
import employeePortal from './config/employee-portal';
import enrichment from './config/enrichment';
import ftlAdmin from './config/ftl-admin';
import groundOps from './config/ground-ops';
import ihls from './config/ihls';
import ingestion from './config/ingestion';
import inventory_management from './config/inventory_management';
import kamDesk from './config/kam-desk';
import kamMonitoring from './config/kam-monitoring';
import lastMileDesk from './config/last-mile-desk';
import liabilityDashboard from './config/liability-dashboard';
import locations from './config/location';
import myIncident from './config/my-incident';
import myProfile from './config/my-profile';
import newEmployeeDashboard from './config/new-employee-dashboard';
import performanceManagement from './config/performance-management';
import printingDesk from './config/printing-desk';
import referral from './config/referral';
import revenueDesk from './config/revenue-desk';
import rfqDashboard from './config/rfq-dashboard';
import riskManagement from './config/risk-management';
import rolesAndPermissions from './config/roles-n-permission';
import saasSubscription from './config/saas-subscription';
import saasTools from './config/saas-tools';
import shipmentAirCustoms from './config/shipment-air-customs';
import shipmentAirFreight from './config/shipment-air-freight';
import shipmentAirFreightLocal from './config/shipment-air-freight-local';
import shipmentDomesticAirFreight from './config/shipment-domestic-air-freight';
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
	...locations,
	...groundOps,
	...allocations,
	...supplyDashboard,
	...contracts,
	...businessFinance,
	...unifiedDashboard,
	...vendorRM,
	...cogoAcademy,
	...ihls,
	...myIncident,
	...myProfile,
	...enrichment,
	...cogoVerseAnalytics,
	...cogoOne,
	...myProfile,
	...inventory_management,
	...kamMonitoring,
	...performanceManagement,
	...employeePortal,
	...shipmentFclFreight,
	...shipmentFclCfs,
	...shipmentLclFreight,
	...bookingDeskAir,
	...shipmentAirFreight,
	...shipmentAirFreightLocal,
	...shipmentAirCustoms,
	...shipmentDomesticAirFreight,
	...shipmentRailDomesticFreight,
	...shipmentHaulageFreight,
	...bookingDesk,
	...bnSalvage,
	...costBookingDesk,
	...authorityDesk,
	...lastMileDesk,
	...welcome,
	...referral,
	...kamDesk,
	...airRepository,
	...documentDesk,
	...ingestion,
	...newEmployeeDashboard,
	...blDoCollectionRelease,
	...saasTools,
	...chro,
	...controlledBooking,
	...saasSubscription,
	...so2Surface,
	...chakravyuh,
	...riskManagement,
	...awbInventory,
	...revenueDesk,
	...shipmentFclCustom,
	...shipmentFclFreightLocal,
	...shipmentFtlFreight,
	...shipmentLtlFreight,
	...ticketManagement,
	...liabilityDashboard,
	...rfqDashboard,
	...printingDesk,
	...ftlAdmin,
	...airlinePluginBooking,
};

export default routeConfig;
