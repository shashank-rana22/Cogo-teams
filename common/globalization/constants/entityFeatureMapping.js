const ENTITY_FEATURE_MAPPING = {
	101: {
		labels: {
			irn_label                 : 'IRN',
			tax_label                 : 'PAN Number',
			sage_label                : 'Sage ID',
			search_options_label_pan  : 'Business Name/PAN Number',
			search_options_label_sage : 'Sage ID',
		},
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
		placeholder: {
			tax_number: 'Search By Business Name/Pan Number',
		},
		feature_supported: ['terminal_charge'],
	},
	401: {
		labels: {
			irn_label                 : 'IRN',
			tax_label                 : 'PAN Number',
			sage_label                : 'Sage ID',
			search_options_label_pan  : 'Business Name/PAN Number',
			search_options_label_sage : 'Sage ID',
		},
		placeholder: {
			tax_number: 'Search By Business Name/Pan Number',
		},
		feature_supported: [],
	},
	501: {
		labels: {
			irn_label                 : 'E-invoice',
			tax_label                 : 'VAT Number',
			sage_label                : null,
			search_options_label_pan  : 'Business Name/VAT Number',
			search_options_label_sage : null,
		},
		placeholder: {
			tax_number: 'Search By Business Name/VAT Number',
		},
		feature_supported: [],
	},
};

export default ENTITY_FEATURE_MAPPING;
