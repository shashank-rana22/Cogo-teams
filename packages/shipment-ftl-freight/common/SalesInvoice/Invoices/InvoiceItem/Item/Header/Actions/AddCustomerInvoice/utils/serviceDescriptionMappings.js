import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

export const customerToServiceDescription = {
	[geo?.uuid?.fortigo_agencies_mapping?.fortigo_network_logistics]:
		'Goods Transport Agency - FCM',
	[geo?.uuid?.fortigo_agencies_mapping?.fortigo_transport_agency]:
		'Goods Transport Agency - RCM',
};

export const customerToCin = {
	[geo?.uuid?.fortigo_agencies_mapping?.fortigo_network_logistics]:
		'U72200KA2015PTC082767',
	[geo?.uuid?.fortigo_agencies_mapping?.fortigo_transport_agency]:
		'U60221KA2018PTC112639',
};

export const taxPayableRCM = {
	[geo?.uuid?.fortigo_agencies_mapping?.fortigo_network_logistics] : 'No',
	[geo?.uuid?.fortigo_agencies_mapping?.fortigo_transport_agency]  : 'Yes',
};

export const customerToBankDetails = {
	[geo?.uuid?.fortigo_agencies_mapping?.fortigo_network_logistics]: {
		bank_name      : 'Axis Bank',
		bank_branch    : 'Corporate Banking Branch',
		ifsc_code      : 'UTIB000541',
		account_number : '9210 2001 0527 964',
	},
	[geo?.uuid?.fortigo_agencies_mapping?.fortigo_transport_agency]: {
		bank_name      : 'ICICI',
		bank_branch    : 'Koramangala Branch (Bangalore)',
		ifsc_code      : 'ICIC0000047',
		account_number : '0047 0501 4491',
	},
};

export const shipperToPanMapping = {
	exide_industries : 'AAACE6641E',
	adani_wilmar     : 'AABCA8056G',
	gujarat_milk     : 'AAAAG5588Q',
	hil_limited      : 'AAACH2676Q',
	itc_limited      : 'AAACI5950L',
	ivl_dhunseri     : 'AAFCD5214M',
	kansai_nerolac   : 'AAACG1376N',
	orissa_metaliks  : 'AAACO8663L',
	varun_beverages  : 'AAACV2678L',
};
