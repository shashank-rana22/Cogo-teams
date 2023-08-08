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
			'terminal_charge',
		],
		placeholder: {
			tax_number: 'Search By Business Name/Pan Number',
		},
	},
	401: {
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
	},
};

export default ENTITY_FEATURE_MAPPING;
