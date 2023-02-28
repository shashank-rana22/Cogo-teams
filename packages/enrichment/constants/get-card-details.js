import { IcMLocation, IcMProfile } from '@cogoport/icons-react';

export const cardHeading = {
	user: {
		icon  : <IcMProfile />,
		label : 'POC',
	},
	address: {
		icon  : <IcMLocation />,
		label : 'Address',
	},
};

export const cardLabelsMapping = {
	user: {
		name                    : 'Point Of Contact',
		email                   : 'Email',
		mobile_number           : 'Mobile Number',
		alternate_mobile_number : 'Alternate Mobile Number',
		whatsapp_number         : 'Whatsapp Number',

	},
	address: {
		address    : 'Address',
		city       : 'City',
		state      : 'State',
		country    : 'Country',
		pincode    : 'Pincode',
		tax_number : 'Tax Number',

	},
};

export const mobileNumberMapping = {
	mobile_number   : 'mobile_country_code',
	whatsapp_number : 'whatsapp_country_code',
};
