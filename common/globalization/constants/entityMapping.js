/* eslint-disable custom-eslint/uuid-check */
import {
	IcCCountryIndia,
	IcCCountryNetherland,
	IcCCountrySingapore,
	IcCCountryVietnam,
} from '@cogoport/icons-react';

const ENTITY_MAPPING = {
	101: {
		country_code        : 'IN',
		name                : 'COGO FREIGHT PVT LTD',
		id                  : '6fd98605-9d5d-479d-9fac-cf905d292b88',
		icon                : IcCCountryIndia,
		currency            : 'INR',
		default_entity_code : '301',
		feature_supported   : ['compliance', 'post_to_sage'],
		labels              : {
			irn_label: 'IRN',
		},
		GSTIN: ['27AAGCC4470P1Z5', 'MUMC22090F', 'MUMC26454B'],
	},
	201: {
		country_code        : 'NL',
		name                : 'Cogoport Netherlands',
		id                  : 'c7e1390d-ec41-477f-964b-55423ee84700',
		icon                : IcCCountryNetherland,
		currency            : 'EUR',
		default_entity_code : '201',
		feature_supported   : ['cogo_books', 'post_to_sage'],
		labels              : {
			irn_label: 'IRN',
		},
		GSTIN: [],
	},
	301: {
		country_code        : 'IN',
		name                : 'COGOPORT PRIVATE LIMITED',
		id                  : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
		icon                : IcCCountryIndia,
		currency            : 'INR',
		default_entity_code : '301',
		feature_supported   : ['cogo_books', 'post_to_sage', 'cancel_irn', 'compliance'],
		labels              : {
			irn_label: 'IRN',
		},
		GSTIN: ['06AAICC8838P1ZV', '07AAACF2136K1ZT', '27AAACF2136K1ZR', '27AAICC8838P1ZR', 'MUMC26454B'],
	},
	401: {
		country_code        : 'SG',
		name                : 'Cogo Universe Pte. Ltd',
		id                  : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
		icon                : IcCCountrySingapore,
		currency            : 'SGD',
		default_entity_code : '401',
		feature_supported   : ['cogo_books', 'post_to_sage'],
		labels              : {
			irn_label: 'IRN',
		},
		GSTIN: [],
	},
	501: {
		country_code        : 'VN',
		name                : 'Cogoport Vietnam',
		id                  : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		icon                : IcCCountryVietnam,
		default_entity_code : '501',
		currency            : 'VND',
		feature_supported   : ['cogo_books',
			'freight_sales_invoice_restricted_enitity',
			'cancel_e_invoice',
			'upload_invoice',
		],
		labels: {
			irn_label: 'E-invoice',
		},
		GSTIN: [],
	},
};

export default ENTITY_MAPPING;
