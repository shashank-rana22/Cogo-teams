import { IcMLocation, IcMProfile } from '@cogoport/icons-react';

export const getCardHeaders = (type) => ({

	user: {
		icon  : <IcMProfile />,
		label : type === 'form' ? 'Add POC Details' : 'POC',
	},

	address: {
		icon  : <IcMLocation />,
		label : type === 'form' ? 'Add Address Details' : 'Address',
	},
});

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
		gst_number : 'Tax Number',

	},
};

export const mobileNumberMapping = {
	mobile_number   : 'mobile_country_code',
	whatsapp_number : 'whatsapp_country_code',
};
