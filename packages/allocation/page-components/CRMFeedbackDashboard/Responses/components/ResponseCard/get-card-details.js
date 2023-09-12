import { IcMLocation, IcMProfile } from '@cogoport/icons-react';

export const getCardHeader = ({ t = () => {} }) => ({
	user: {
		icon  : <IcMProfile />,
		label : t('allocation:card_header_poc_label'),
	},
	address: {
		icon  : <IcMLocation />,
		label : t('allocation:card_header_address_label'),
	},
});

export const getCardLabelMappings = ({ t = () => {} }) => ({
	user: {
		name                    : t('allocation:user_name_label'),
		email                   : t('allocation:user_email_label'),
		mobile_number           : t('allocation:user_mobile_number_label'),
		alternate_mobile_number : t('allocation:user_alternate_mobile_number_label'),
		whatsapp_number         : t('allocation:user_whatsapp_number_label'),

	},
	address: {
		city       : t('allocation:address_city_label'),
		state      : t('allocation:address_state_label'),
		country    : t('allocation:address_country_label'),
		pincode    : t('allocation:address_pincode_label'),
		tax_number : t('allocation:address_tax_number_label'),
	},
});

export const MOBILE_NUMBERS_MAPPING = {
	mobile_number           : 'mobile_country_code',
	whatsapp_number         : 'whatsapp_country_code',
	alternate_mobile_number : 'alternate_mobile_country_code',
};
