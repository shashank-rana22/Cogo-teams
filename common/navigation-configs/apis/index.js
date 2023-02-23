import allocation from './allocation-apis';
import app_contract_management from './app-manage-contract-apis';
import app_manage_rfq from './app-manage-rfq-apis';
import app_settings from './app-settings';
import bl_do from './bl-do-apis';
import bl_do_collection_release from './bl_do_collection_release';
import bn_salvage from './bn-salvage-apis';
import coe_finance from './coe-finance-apis';
import cogoLens from './cogo-lens';
import common_apis from './common-apis';
import consolidated_invoices from './consolidated-invoices';
import contract_rates from './contract-rates-apis';
import cost_booking_desk from './cost-booking-desk-apis';
import document_walet from './doc-walet';
import document_desk from './document-desk-apis';
import enquiry_supply from './enquiry-supply-apis';
import enrichment from './enrichment';
import feedback from './feedback-apis';
import feedback_system from './feedback-system-apis';
import kam_desk from './kam-desk-apis';
import kam_payments_dashboard from './kam-payments-dashboard-apis';
import kyc from './kyc';
import login_apis from './login_apis';
import ltl_operations from './ltl-operations-apis';
import manage_rfq from './manage-rfq-apis';
import okam_task_apis from './okam-task-dashboard';
import partner from './partner-apis';
import payments from './payments-apis';
import pms from './port-management';
import rms from './rate-management-apis';
import revenue_desk_apis from './revenue-desk-apis';
import rfq from './rfq-apis';
import saas from './saas';
import search from './search-apis';
import shipment from './shipment-apis';
import shipment_cancellation_policies from './shipment-cancellation-poilicies';
import sop from './sop-apis';
import tech_ops from './tech-ops-apis';
import techops_dashboard from './techops_dashboard';
import tools from './tools';

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
	sop: sop.map((api) => ({
		...api,
		module: 'demand_crm',
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
	techops_dashboard,
	cogolens: cogoLens,
	shipment_cancellation_policies,
	kam_payments_dashboard,
	...allocation,
	manage_rfq,
	app_manage_rfq,
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
	feedback_system,
};

export default apis;
