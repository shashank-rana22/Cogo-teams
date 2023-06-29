import {
	IcCCountryIndia,
	IcCCountryNetherland,
	IcCCountrySingapore,
	IcCCountryVietnam,
} from '@cogoport/icons-react';

const ENTITY_MAPPING = {
	101: {
		country_code      : 'IN',
		name              : 'COGO FREIGHT PVT LTD',
		id                : '6fd98605-9d5d-479d-9fac-cf905d292b88',
		icon              : IcCCountryIndia,
		currency          : 'INR',
		feature_supported : ['post_to_sage'],
		labels            : {
			irn_label                 : 'IRN',
			tax_label                 : 'PAN Number',
			sage_label                : 'Sage ID',
			search_options_label_pan  : 'Business Name/PAN Number',
			search_options_label_sage : 'Sage ID',
		},
		placeholder: {
			tax_number: 'Search By Business Name/Pan Number',
		},
	},
	201: {
		country_code      : 'NL',
		name              : 'Cogoport Netherlands',
		id                : 'c7e1390d-ec41-477f-964b-55423ee84700',
		icon              : IcCCountryNetherland,
		currency          : 'EUR',
		feature_supported : ['cogo_books', 'post_to_sage'],
		labels            : {
			irn_label                 : 'IRN',
			tax_label                 : 'PAN Number',
			sage_label                : 'Sage ID',
			search_options_label_pan  : 'Business Name/PAN Number',
			search_options_label_sage : 'Sage ID',
		},
		placeholder: {
			tax_number: 'Search By Business Name/Pan Number',
		},
	},
	301: {
		country_code      : 'IN',
		name              : 'COGOPORT PRIVATE LIMITED',
		id                : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
		icon              : IcCCountryIndia,
		currency          : 'INR',
		feature_supported : ['cogo_books', 'post_to_sage', 'cancel_irn'],
		labels            : {
			irn_label                 : 'IRN',
			tax_label                 : 'PAN Number',
			sage_label                : 'Sage ID',
			search_options_label_pan  : 'Business Name/PAN Number',
			search_options_label_sage : 'Sage ID',
		},
		placeholder: {
			tax_number: 'Search By Business Name/Pan Number',
		},
	},
	401: {
		country_code      : 'SG',
		name              : 'Cogo Universe Pte. Ltd',
		id                : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
		icon              : IcCCountrySingapore,
		currency          : 'SGD',
		feature_supported : ['cogo_books', 'post_to_sage'],
		labels            : {
			irn_label                 : 'IRN',
			tax_label                 : 'PAN Number',
			sage_label                : 'Sage ID',
			search_options_label_pan  : 'Business Name/PAN Number',
			search_options_label_sage : 'Sage ID',
		},
		placeholder: {
			tax_number: 'Search By Business Name/Pan Number',
		},
	},
	501: {
		country_code      : 'VN',
		name              : 'Cogoport Vietnam',
		id                : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		icon              : IcCCountryVietnam,
		currency          : 'VND',
		feature_supported : ['cogo_books',
			'freight_sales_invoice_restricted_enitity',
			'cancel_e_invoice',
			'upload_invoice',
			'is_revoked'],
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
	},
};

export default ENTITY_MAPPING;
