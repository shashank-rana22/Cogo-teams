import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const {
	fortigo_registration_number_mappings,
	fortigo_company_pan_mappings,
	fortigo_cin_mappings,
	fortigo_bank_details_mappings,
	cogo_bank_details,
	customer_pan_mappings,
} = GLOBAL_CONSTANTS.others;

export const CUSTOMER_TO_SERVICE_DESCRIPTION = {
	[GLOBAL_CONSTANTS.uuid.fortigo_agencies_mapping.fortigo_network_logistics]:
		'Goods Transport Agency - FCM',
	[GLOBAL_CONSTANTS.uuid.fortigo_agencies_mapping.fortigo_transport_agency]:
		'Goods Transport Agency - RCM',
};

export const PAN_TO_SERVICE_DESCRIPTION = {
	[fortigo_company_pan_mappings.fortigo_network_logistics]:
		'Goods Transport Agency - FCM',
	[fortigo_company_pan_mappings.fortigo_transport_agency]:
		'Goods Transport Agency - RCM',
};

export const CUSTOMER_TO_CIN = {
	[GLOBAL_CONSTANTS.uuid.fortigo_agencies_mapping.fortigo_network_logistics]:
		fortigo_cin_mappings.fortigo_network_logistics,
	[GLOBAL_CONSTANTS.uuid.fortigo_agencies_mapping.fortigo_transport_agency]:
		fortigo_cin_mappings.fortigo_transport_agency,
};

export const PAN_TO_CIN = {
	[fortigo_company_pan_mappings.fortigo_network_logistics]:
		fortigo_cin_mappings.fortigo_network_logistics,
	[fortigo_company_pan_mappings.fortigo_transport_agency]:
		fortigo_cin_mappings.fortigo_transport_agency,
};

export const TAX_PAYABLE_RCM = {
	[GLOBAL_CONSTANTS.uuid.fortigo_agencies_mapping.fortigo_network_logistics] : 'No',
	[GLOBAL_CONSTANTS.uuid.fortigo_agencies_mapping.fortigo_transport_agency]  : 'Yes',
};

export const PAN_TAX_PAYABLE_RCM = {
	[fortigo_company_pan_mappings.fortigo_network_logistics] : 'No',
	[fortigo_company_pan_mappings.fortigo_transport_agency]  : 'Yes',
};

export const CUSTOMER_TO_BANK_DETAILS = {
	[GLOBAL_CONSTANTS.uuid.fortigo_agencies_mapping.fortigo_network_logistics]: {
		bank_name      : 'Axis Bank',
		bank_branch    : 'Corporate Banking Branch',
		ifsc_code      : fortigo_bank_details_mappings.fortigo_network_logistics.ifsc_code,
		account_number : fortigo_bank_details_mappings.fortigo_network_logistics.account_number,
	},
	[GLOBAL_CONSTANTS.uuid.fortigo_agencies_mapping.fortigo_transport_agency]: {
		bank_name      : 'ICICI',
		bank_branch    : 'Koramangala Branch (Bangalore)',
		ifsc_code      : fortigo_bank_details_mappings.fortigo_transport_agency.ifsc_code,
		account_number : fortigo_bank_details_mappings.fortigo_transport_agency.account_number,
	},
};

export const PAN_TO_BANK_DETAILS = {
	[fortigo_company_pan_mappings.fortigo_network_logistics]: {
		bank_name      : 'Axis Bank',
		bank_branch    : 'Corporate Banking Branch',
		ifsc_code      : fortigo_bank_details_mappings.fortigo_network_logistics.ifsc_code,
		account_number : fortigo_bank_details_mappings.fortigo_network_logistics.account_number,
	},
	[fortigo_company_pan_mappings.fortigo_transport_agency]: {
		bank_name      : 'ICICI',
		bank_branch    : 'Koramangala Branch (Bangalore)',
		ifsc_code      : fortigo_bank_details_mappings.fortigo_transport_agency.ifsc_code,
		account_number : fortigo_bank_details_mappings.fortigo_transport_agency.account_number,
	},
};

export const DEFAULT_BANK_DETAILS = {
	bank_name   : 'RBL BANK LIMITED',
	bank_branch : 'LOWER PAREL',
	ifsc_code   : cogo_bank_details.ifsc_code,
	account_number:
		cogo_bank_details.account_number,
};

export const BUSINESS_TO_SERVICE_DESCRIPTION = {
	fcm : 'Goods Transport Agency - FCM',
	rcm : 'Goods Transport Agency - RCM',
};

export const SHIPPER_TO_PAN_MAPPINGS = {
	exide_industries : customer_pan_mappings.exide_industries,
	adani_wilmar     : customer_pan_mappings.adani_wilmar,
	gujarat_milk     : customer_pan_mappings.gujarat_milk,
	hil_limited      : customer_pan_mappings.hil_limited,
	itc_limited      : customer_pan_mappings.itc_limited,
	ivl_dhunseri     : customer_pan_mappings.ivl_dhunseri,
	kansai_nerolac   : customer_pan_mappings.kansai_nerolac,
	orissa_metaliks  : customer_pan_mappings.orissa_metaliks,
	varun_beverages  : customer_pan_mappings.varun_beverages,
};

export const INVOICE_SOURCES = {
	UPLOADED         : 'uploaded',
	SYSTEM_GENERATED : 'system_generated',
};

const LINE_MAPPING = {
	fnl : 'Our Company is registered as a Micro Enterprise under the MSME Act 2006 with registration number',
	fta : 'Our Company is registered as a Small Enterprise under the MSME Act 2006 with registration number',
};

export const CUSTOMER_TO_ENTERPRISE_TYPE_MAPPING = {
	[fortigo_company_pan_mappings.fortigo_network_logistics]:
		`${LINE_MAPPING.fnl} : ${fortigo_registration_number_mappings.fortigo_network_logistics}`,
	[fortigo_company_pan_mappings.fortigo_transport_agency]:
		`${LINE_MAPPING.fta} : ${fortigo_registration_number_mappings.fortigo_transport_agency}`,
};
