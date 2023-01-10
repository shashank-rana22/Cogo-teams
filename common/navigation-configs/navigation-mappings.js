import {
	IcMBldesk,
	IcMBookingDesk,
	IcMBusinessFinance,
	IcMFfcl, IcMFinanceCrm, IcMFinanceDashboard, IcMLocation, IcMProductCodeMapping, IcMSettings,
} from '@cogoport/icons-react';

import business_finance from './apis/business-finance-apis';
// import coe_finance from './apis/coe-finance-apis';
import roles_permissions from './apis/roles-n-permission-apis';

const navigationMappings = {
	home: {
		key           : 'home',
		title         : 'Home',
		href          : '/home',
		as            : '/home',
		icon          : IcMBookingDesk,
		main_apis     : ['list_shipments'],
		possible_apis : [],
	},
	business_finance: {
		key           : 'business_finance',
		title         : 'Business Finance',
		href          : '/business-finance',
		as            : '/business-finance',
		icon          : IcMBusinessFinance,
		main_apis     : ['get_purchase_payment_upload_list'],
		possible_apis : [...business_finance],
		options       : [
			{
				key           : 'business_finance-account_payables',
				title         : 'Account Payables',
				href          : '/business-finance/account-payables',
				as            : '/business-finance/account-payables',
				icon          : IcMFinanceCrm,
				main_apis     : ['get_purchase_payable_bill_list'],
				possible_apis : [...business_finance],
			},
			{
				key           : 'business_finance-account_receivables',
				title         : 'Account Receivables',
				href          : '/business-finance/account-receivables',
				as            : '/business-finance/account-receivables',
				icon          : IcMFinanceDashboard,
				main_apis     : ['get_sales_dashboard_collection_trend'],
				possible_apis : [...business_finance],
			},
			{
				key           : 'product_code_mapping',
				title         : 'Product Code Mappings',
				href          : '/business-finance/product-code-mappings',
				as            : '/business-finance/product-code-mappings',
				icon          : IcMProductCodeMapping,
				main_apis     : ['get_common_item'],
				possible_apis : [...business_finance],
			},
		],
	},
	coe: {
		key       : 'coe',
		title     : 'Center of Excellence',
		href      : '/coe',
		as        : '/coe',
		icon      : IcMBldesk,
		main_apis : ['list_shipments'],
		options   : [
			{
				key           : 'coe-finance',
				title         : 'Finance',
				href          : '/coe-finance/dashboard',
				as            : '/coe-finance/dashboard',
				icon          : IcMProductCodeMapping,
				main_apis     : ['list_shipments'],
				possible_apis : [...business_finance],
			},
			{
				key       : 'coe-fcl_revenue_desk',
				title     : 'FCL Revenue Desk',
				href      : '/revenue-desk/fcl-freight',
				as        : '/revenue-desk/fcl-freight',
				icon      : IcMFfcl,
				main_apis : ['list_shipments'],
			},
		],
	},

	locations: {
		key       : 'locations',
		title     : 'Locations',
		icon      : IcMLocation,
		href      : '/locations',
		as        : '/locations',
		main_apis : ['list_locations'],
		// possible_apis : [...locations],
		options   : [
			{
				key   : 'locations',
				icon  : IcMLocation,
				title : 'Locations View',
				href  : '/locations',
				as    : '/locations',
				// possible_apis : [...locations],
			},
		],
		module_type: 'crm',
	},
	roles_permissions: {
		key           : 'roles_permissions',
		title         : 'Roles and Permissions',
		icon          : IcMSettings,
		href          : '/list-roles',
		as            : '/list-roles',
		type          : 'link',
		main_apis     : ['list_auth_roles'],
		possible_apis : [...roles_permissions],
		module_type   : 'crm',
	},
};

export default navigationMappings;
