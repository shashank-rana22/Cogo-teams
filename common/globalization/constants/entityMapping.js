/* eslint-disable custom-eslint/uuid-check */
import {
	IcCCountryIndia,
	IcCCountryNetherland,
	IcCCountrySingapore,
	IcCCountryVietnam,
	IcCIndonesia,
	IcCThailand,
	IcCChina,
} from '@cogoport/icons-react';

const ENTITY_MAPPING = {
	101: {
		country_code        : 'IN',
		name                : 'COGO FREIGHT PVT LTD.',
		id                  : '6fd98605-9d5d-479d-9fac-cf905d292b88',
		icon                : IcCCountryIndia,
		currency            : 'INR',
		code                : '101',
		default_entity_code : '301',
		GSTIN               : ['27AAGCC4470P1Z5', 'MUMC22090F', 'MUMC26454B'],
		display_name        : 'Cogoport India',
	},
	201: {
		country_code        : 'NL',
		name                : 'Cogoport Netherlands',
		id                  : 'c7e1390d-ec41-477f-964b-55423ee84700',
		icon                : IcCCountryNetherland,
		currency            : 'EUR',
		default_entity_code : '201',
		code                : '201',
		GSTIN               : [],
		display_name        : 'Cogoport Netherlands',
	},
	301: {
		country_code        : 'IN',
		name                : 'COGOPORT PRIVATE LIMITED',
		id                  : 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',
		icon                : IcCCountryIndia,
		currency            : 'INR',
		default_entity_code : '301',
		code                : '301',
		feature_supported   : ['cogo_books', 'post_to_sage', 'cancel_irn', 'compliance', 'dunning'],
		labels              : {
			irn_label: 'IRN',
		},
		GSTIN: ['06AAICC8838P1ZV', '07AAACF2136K1ZT',
			'27AAACF2136K1ZR', '27AAICC8838P1ZR', 'MUMC26454B'],
		display_name: 'COGOPORT PRIVATE LIMITED',
	},
	401: {
		country_code        : 'SG',
		name                : 'Cogo Universe Pte. Ltd',
		id                  : '04bd1037-c110-4aad-8ecc-fc43e9d4069d',
		icon                : IcCCountrySingapore,
		currency            : 'SGD',
		default_entity_code : '401',
		code                : '401',
		GSTIN               : [],
		display_name        : 'Cogoport Universe',
	},
	501: {
		country_code        : 'VN',
		name                : 'Cogoport Vietnam',
		id                  : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		icon                : IcCCountryVietnam,
		default_entity_code : '501',
		code                : '501',
		currency            : 'VND',
		GSTIN               : [],
		display_name        : 'Cogoport Vietnam',
	},
	601: {
		country_code        : 'TH',
		name                : 'Cogoport Thailand',
		id                  : '6d92cf58-3392-44c3-8e1b-09192f98f8be',
		icon                : IcCThailand,
		default_entity_code : '601',
		code                : '601',
		currency            : 'THB',
		GSTIN               : [],
		display_name        : 'Cogoport Thailand',
	},
	701: {
		country_code        : 'ID',
		name                : 'Cogoport Indonesia',
		id                  : 'ef9a7145-b1b6-46ff-8de7-a348de635574',
		icon                : IcCIndonesia,
		default_entity_code : '701',
		code                : '701',
		currency            : 'IDR',
		GSTIN               : [],
		display_name        : 'Cogoport Indonesia',
	},
	801: {
		country_code        : 'CN',
		name                : 'Cogoport China',
		id                  : 'ff9a7145-b1b6-46ff-8de7-a348de635574',
		icon                : IcCChina,
		default_entity_code : '81',
		currency            : 'CNY',
		code                : '801',
		GSTIN               : [],
		display_name        : 'Cogoport China',
	},
};

export default ENTITY_MAPPING;
