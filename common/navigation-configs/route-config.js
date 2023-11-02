import advanceBookingManager from './config/advance-booking-manager';
import airRepository from './config/air-repository';
import airlinePluginBooking from './config/airline-booking-plugin';
import allocations from './config/allocations';
import amsSubmission from './config/ams-submission';
import attendanceLeaveManagement from './config/attendance-leave-management';
import authorityDesk from './config/authority-desk';
import blDoCollectionRelease from './config/bl_do-collection-release';
import bnSalvage from './config/bn-salvage';
import bookingDesk from './config/booking-desk';
import bookingDeskAir from './config/booking-desk-air';
import bookingDeskSurface from './config/booking-desk-surface';
import business from './config/business';
import businessFinance from './config/business-finance';
import byodDashboard from './config/byod-dashboard';
import cancellationPolicies from './config/cancellation-policies';
import centralisedCustomerService from './config/centralised-customer-service';
import chakravyuh from './config/chakravyuh';
import chro from './config/chro';
import cogoAcademy from './config/cogo-academy';
import cogoAssured from './config/cogo-assured';
import cogoOne from './config/cogo-one';
import cogoStore from './config/cogo-store';
import cogoVerseAnalytics from './config/cogo-verse-analytics';
import contracts from './config/contracts';
import controlledBooking from './config/controlled-booking';
import convenienceRates from './config/convenience-rates';
import costBookingDesk from './config/cost-booking-desk';
import demandForecast from './config/demand-forecast';
import documentDesk from './config/document-desk';
// import employeeDashboard from './config/employee-dashboard';
import employeeDirectory from './config/employee-directory';
import employeePortal from './config/employee-portal';
import enrichment from './config/enrichment';
import ftlAdmin from './config/ftl-admin';
import ftlFieldSreviceOps from './config/ftl_field_service_ops_app';
import governanceManager from './config/governance-manager';
import groundOps from './config/ground-ops';
import igmDesk from './config/igm-desk';
import ihls from './config/ihls';
import ingestion from './config/ingestion';
import inventory_management from './config/inventory_management';
import kamDesk from './config/kam-desk';
import kamMonitoring from './config/kam-monitoring';
import lastMileDesk from './config/last-mile-desk';
import liabilityDashboard from './config/liability-dashboard';
import locations from './config/location';
import managerDashboard from './config/manager-dashboard';
import margins from './config/margins';
import marketing from './config/marketing';
import myIncident from './config/my-incident';
import myProfile from './config/my-profile';
import newEmployeeDashboard from './config/new-employee-dashboard';
import notifications from './config/notifications';
import performanceAndIncentives from './config/performance-and-incentives';
import PERFORMANCE_MANAGEMENT from './config/performance-management';
import printingDesk from './config/printing-desk';
import profile from './config/profile';
import promotions from './config/promotions';
import referral from './config/referral';
import resource from './config/resources';
import revenueDesk from './config/revenue-desk';
import rfqDashboard from './config/rfq-dashboard';
import riskManagement from './config/risk-management';
import rolesAndPermissions from './config/roles-n-permission';
import saas from './config/saas';
import saasSubscription from './config/saas-subscription';
import saasTools from './config/saas-tools';
import schedules from './config/schedules';
import serviceDiscovery from './config/service-discovery';
import serviceManagement from './config/service-management';
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
import supplyAllocation from './config/supply-allocation';
import supplyDashboard from './config/supply-dashboards';
import supplyTools from './config/supply-tools';
import termsAndConditions from './config/terms-and-conditions';
import ticketManagement from './config/ticket-management';
import tradeParties from './config/trade-parties';
import unifiedDashboard from './config/unified-dashboard';
import vendorRM from './config/vendor-rm';
import warehouseManagement from './config/warehouse-management';
import welcome from './config/welcome';

const routeConfig = {
	...rolesAndPermissions,
	...locations,
	...cogoAssured,
	...groundOps,
	...allocations,
	...supplyDashboard,
	...contracts,
	...business,
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
	...promotions,
	...kamMonitoring,
	...PERFORMANCE_MANAGEMENT,
	...supplyAllocation,
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
	...cancellationPolicies,
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
	...advanceBookingManager,
	...revenueDesk,
	...shipmentFclCustom,
	...shipmentFclFreightLocal,
	...shipmentFtlFreight,
	...shipmentLtlFreight,
	...ticketManagement,
	...liabilityDashboard,
	...rfqDashboard,
	...governanceManager,
	...byodDashboard,
	...convenienceRates,
	// ...employeeDashboard,
	...managerDashboard,
	...printingDesk,
	...warehouseManagement,
	...ftlAdmin,
	...schedules,
	...igmDesk,
	...airlinePluginBooking,
	...bookingDeskSurface,
	...demandForecast,
	...employeeDirectory,
	...ftlFieldSreviceOps,
	...notifications,
	...attendanceLeaveManagement,
	...centralisedCustomerService,
	...resource,
	...termsAndConditions,
	...serviceDiscovery,
	...supplyTools,
	...profile,
	...performanceAndIncentives,
	...amsSubmission,
	...tradeParties,
	...marketing,
	...margins,
	...saas,
	...serviceManagement,
	...cogoStore,
};

export default routeConfig;
