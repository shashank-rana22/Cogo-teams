import { IcMLocation, IcMProfile } from '@cogoport/icons-react';

export const CARD_HEADER = {
	user: {
		icon  : <IcMProfile />,
		label : 'POC',
	},
	address: {
		icon  : <IcMLocation />,
		label : 'Address',
	},
};

export const CARD_LABELS_MAPPING = {
	user: {
		name                    : 'Point Of Contact (User Name)',
		email                   : 'Email',
		mobile_number           : 'Mobile Number',
		alternate_mobile_number : 'Alternate Mobile Number',
		whatsapp_number         : 'Whatsapp Number',

	},
	address: {
		city       : 'City',
		state      : 'State',
		country    : 'Country',
		pincode    : 'Pincode',
		tax_number : 'GSTIN',
	},
};

export const MOBILE_NUMBERS_MAPPING = {
	mobile_number           : 'mobile_country_code',
	whatsapp_number         : 'whatsapp_country_code',
	alternate_mobile_number : 'alternate_mobile_country_code',
};
