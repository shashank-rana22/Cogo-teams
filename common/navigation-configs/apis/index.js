import allocation from './allocation-apis';
import app_contract_management from './app-manage-contract-apis';
import app_manage_rfq from './app-manage-rfq-apis';
import app_settings from './app-settings';
import athena_dashboard from './athena-apis';
import authApis from './auth-apis';
import bl_do from './bl-do-apis';
import bl_do_collection_release from './bl_do-collection-release-apis';
import bn_salvage from './bn-salvage-apis';
import booking_desk from './booking-desk-apis';
import centralised_customer_service from './centralised-customer-service-apis';
import chakravyuh from './chakravyuh-apis';
import chro from './chro';
import coe_finance from './coe-finance-apis';
import cogoLens from './cogo-lens';
import common_apis from './common-apis';
import consolidated_invoices from './consolidated-invoices';
import contract_rates from './contract-rates-apis';
import cost_booking_desk from './cost-booking-desk-apis';
import document_walet from './doc-walet';
import document_desk from './document-desk-apis';
import enquiry_supply from './enquiry-supply-apis';
import enrichment from './enrichment-apis';
import faq from './faq-apis';
import feedback from './feedback-apis';
import ff_cost_booking from './ff-cost-booking-apis';
import ftl_field_service_ops_apis from './ftl_field_service_ops_app_apis';
import governance_manager from './governance-manager-apis';
import HRMS from './hrms-apis';
import igm_desk from './igm-desk-apis';
import igm_shipment from './igm-shipment-apis';
import ingestion from './ingestion-apis';
import cargo_insurance from './insurance-apis';
import kam_desk from './kam-desk-apis';
import kam_payments_dashboard from './kam-payments-dashboard-apis';
import kyc from './kyc';
import login_apis from './login_apis';
import ltl_operations from './ltl-operations-apis';
import manage_rfq from './manage-rfq-apis';
import okam_task_apis from './okam-task-dashboard';
import partner from './partner-apis';
import payments from './payments-apis';
import performance_management from './performance-managment-apis';
import poc from './poc-apis';
import pms from './port-management';
import rms from './rate-management-apis';
import revenue_desk_apis from './revenue-desk-apis';
import rfq from './rfq-apis';
import rfq_dashboard from './rfq-dashboard-apis';
import risk_management from './risk-management-dashboard';
import saas from './saas';
import saas_subscription from './saas-subscription';
import saas_tools from './saas-tools';
import sales_invoice from './sales-invoice-apis';
import schedules from './schedules-apis';
import search from './search-apis';
import service_discovery from './service-discovery';
import shipment from './shipment-apis';
import shipment_cancellation_policies from './shipment-cancellation-poilicies';
import sop from './sop-apis';
import ssr from './ssr';
import supply_allocation from './supply-allocation';
import tech_ops from './tech-ops-apis';
import tools from './tools';
import vendor_rm_apis from './vendor_rm_apis';
import welcome from './welcome-apis';

const apis = {
	search: search.map((api) => ({
		...api,
		module: 'search',
	})),
	shipment: shipment.map((api) => ({
		module  : 'shipment',
		feature : 'shipment',
		...api,
	})),
	igm_shipment: igm_shipment.map((api) => ({
		module  : 'shipment',
		feature : 'shipment',
		...api,
	})),
	sop: sop.map((api) => ({
		...api,
		module: 'demand_crm',
	})),
	vendor_rm_apis: vendor_rm_apis.map((api) => ({
		...api,
		module: 'vendor_rm',
	})),
	revenue_desk: revenue_desk_apis.map((api) => ({
		...api,
		module  : 'shipment',
		feature : 'revenue_desk',
	})),

	enquiry_supply: enquiry_supply.map((api) => ({
		...api,
		module: 'enquiry_supply',
	})),
	rms: rms.map((api) => ({
		...api,
		module  : 'rms',
		feature : 'rms',
	})),
	payments: payments.map((api) => ({
		...api,
		module  : 'payments',
		feature : 'payments',
	})),
	rfq: rfq.map((api) => ({
		...api,
		module: 'rfq',
	})),
	contract_rates: contract_rates.map((api) => ({
		...api,
		module: 'contract_rates',
	})),
	feedback: feedback.map((api) => ({
		...api,
		module: 'feedback',
	})),
	ltl_operations: ltl_operations.map((api) => ({
		...api,
		feature: 'ltl-operations',
	})),
	bl_do,
	bn_salvage,
	coe_finance,
	okam_task_apis,
	tech_ops,
	document_walet,
	kyc,
	pms,
	app_settings,
	cogolens: cogoLens,
	shipment_cancellation_policies,
	kam_payments_dashboard,
	...allocation,
	manage_rfq,
	app_manage_rfq,
	rfq_dashboard,
	bl_do_collection_release,
	kam_desk,
	document_desk,
	cost_booking_desk,
	app_contract_management,
	...saas,
	...common_apis,
	...partner,
	...tools,
	...consolidated_invoices,
	login_apis,
	enrichment,
	...faq,
	...welcome,
	cargo_insurance,
	...saas_tools,
	...performance_management,
	ingestion,
	booking_desk,
	poc,
	...HRMS,
	...athena_dashboard,
	chro,
	ff_cost_booking,
	sales_invoice,
	...saas_subscription,
	...chakravyuh,
	governance_manager,
	risk_management,
	ftl_field_service_ops_apis,
	...schedules,
	igm_desk,
	supply_allocation,
	centralised_customer_service,
	...authApis,
	ssr,
	service_discovery,
};

export default apis;
