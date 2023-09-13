import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const ZERO = GLOBAL_CONSTANTS.zeroth_index;

export const comapanyDetailObjects = ({ data, t }) => [{
	key   : t('supplier_page_supplier_approval_modal_due_diligence_company_name_label'),
	value : data?.data?.statutoryRegistration?.lei?.[ZERO].name,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_corporate_indentification_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_e_billing_status_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_director_name_label'),
	value : data?.data?.statutoryRegistration?.gst?.[ZERO].legalName,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_lei_code_label'),
	value : data?.data?.statutoryRegistration?.lei?.[ZERO].lei,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_lei_status_label'),
	value : data?.data?.statutoryRegistration?.lei?.[ZERO].entityStatus,
},
];

export const financialDetailObjects = ({ data, t }) => [{
	key   : t('supplier_page_supplier_approval_modal_due_diligence_net_revenue_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_long_term_borrowings_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_deferred_tax_liabilies_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_reserves_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_ebitda_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_current_ratio_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_de_ratio_label'),
	value : data?.a,
},
];

export const directorDetailObjects = ({ data, t }) => [{
	key   : t('supplier_page_supplier_approval_modal_due_diligence_company_name_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_corporate_indentification_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_e_billing_status_label'),
	value : data?.a,
},
];

export const genericDetailObjects = ({ data, t }) => [{
	key   : t('supplier_page_supplier_approval_modal_due_diligence_company_registered_since_label'),
	value : data?.data?.statutoryRegistration?.gst?.[ZERO]?.dateOfRegistration,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_charge_id_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_status_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_date_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_holder_name_label'),
	value : data?.a,
},
];

export const shareholderDetailObjects = ({ data, t }) => [{
	key   : t('supplier_page_supplier_approval_modal_due_diligence_finencial_year_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_total_no_of_equity_shares_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_total_no_of_preference_shares_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_no_of_promoter_shareholders_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_no_of_public_shareholders_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_total_no_of_shareholders_label'),
	value : data?.a,
},
];

export const legalDetailObjects = ({ data, t }) => [{
	key   : t('supplier_page_supplier_approval_modal_due_diligence_case_type_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_filed_by_or_filed_against_label'),
	value : data?.a,
}, {
	key   : t('supplier_page_supplier_approval_modal_due_diligence_case_status_label'),
	value : data?.a,
},
];
