const ENTITY_FEATURE_MAPPING = {
	101: {
		labels: {
			irn_label                 : 'IRN',
			tax_label                 : 'PAN Number',
			sage_label                : 'Sage ID',
			search_options_label_pan  : 'Business Name/PAN Number',
			search_options_label_sage : 'Sage ID',
		},
		feature_supported: [
			'compliance',
			'post_to_sage',
			'dunning',
			'ftl_task_date_validation',
		],
		placeholder: {
			tax_number: 'Search By Business Name/Pan Number',
		},
		feature_supported: [],
	},
	201: {
		labels: {
			irn_label                 : 'IRN',
			tax_label                 : 'PAN Number',
			sage_label                : 'Sage ID',
			search_options_label_pan  : 'Business Name/PAN Number',
			search_options_label_sage : 'Sage ID',
		},
		feature_supported: [
			'cogo_books',
			'post_to_sage',
		],
		placeholder: {
			tax_number: 'Search By Business Name/Pan Number',
		},
		feature_supported: [],
	},
	301: {
		labels: {
			irn_label                 : 'IRN',
			tax_label                 : 'PAN Number',
			sage_label                : 'Sage ID',
			search_options_label_pan  : 'Business Name/PAN Number',
			search_options_label_sage : 'Sage ID',
		},
		feature_supported: [
			'cogo_books',
			'post_to_sage',
			'cancel_irn',
			'compliance',
			'dunning',
			'ftl_task_date_validation',
		],
		placeholder: {
			tax_number: 'Search By Business Name/Pan Number',
		},
		feature_supported: ['terminal_charge'],
	},
	401: {
		labels: {
			irn_label                 : 'IRN',
			tax_label                 : 'UEN Number',
			sage_label                : 'Sage ID',
			search_options_label_pan  : 'Business Name/UEN Number',
			search_options_label_sage : 'Sage ID',
		},
		feature_supported: [
			'cogo_books',
			'post_to_sage',
			'cancel_irn',
		],
		placeholder: {
			tax_number: 'Search By Business Name/UEN Number',
		},
		feature_supported: [],
	},
	501: {
		labels: {
			irn_label                 : 'E-Invoice',
			tax_label                 : 'VAT Number',
			sage_label                : null,
			search_options_label_pan  : 'Business Name/VAT Number',
			search_options_label_sage : null,
		},
		feature_supported: [
			'cogo_books',
			'freight_sales_invoice_restricted_enitity',
			'cancel_e_invoice',
			'upload_invoice',
			'dunning',
		],
		placeholder: {
			tax_number: 'Search By Business Name/VAT Number',
		},
		feature_supported: [],
	},
	601: {
		labels: {
			irn_label                 : 'E-invoice',
			tax_label                 : 'TIN Number',
			sage_label                : null,
			search_options_label_pan  : 'Business Name/TIN Number',
			search_options_label_sage : null,
		},
		feature_supported: [
			'cogo_books',
			'freight_sales_invoice_restricted_enitity',
			'cancel_e_invoice',
			'upload_invoice',
			'dunning',
		],
		placeholder: {
			tax_number: 'Search By Business Name/TIN Number',
		},
	},
	701: {
		labels: {
			irn_label                 : 'E-invoice',
			tax_label                 : 'NPWP Number',
			sage_label                : null,
			search_options_label_pan  : 'Business Name/NPWP Number',
			search_options_label_sage : null,
		},
		feature_supported: [
			'cogo_books',
			'freight_sales_invoice_restricted_enitity',
			'cancel_e_invoice',
			'upload_invoice',
			'dunning',
		],
		placeholder: {
			tax_number: 'Search By Business Name/NPWP Number',
		},
	},
	801: {
		labels: {
			irn_label                 : 'E-invoice',
			tax_label                 : 'USCC Number',
			sage_label                : null,
			search_options_label_pan  : 'Business Name/USCC Number',
			search_options_label_sage : null,
		},
		feature_supported: [
			'cogo_books',
			'freight_sales_invoice_restricted_enitity',
			'cancel_e_invoice',
			'upload_invoice',
			'dunning',
		],
		placeholder: {
			tax_number: 'Search By Business Name/USCC Number',
		},
	},
};

export default ENTITY_FEATURE_MAPPING;
