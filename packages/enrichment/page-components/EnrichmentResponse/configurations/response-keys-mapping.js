const REPONSE_KEYS_MAPPING = {
	address : ['address', 'city', 'country', 'state', 'pincode', 'tax_number'],
	user    : [
		'name',
		'email',
		'mobile_number',
		'alternate_mobile_number',
		'whatsapp_number',
		'work_scopes',
	],
};

export const MOBILE_CONTROLS = ['mobile_number', 'alternate_mobile_number', 'whatsapp_number'];

export const COUNTRY_CODE_TO_NUMBER_MAPPING = {
	mobile_number           : 'mobile_country_code',
	alternate_mobile_number : 'alternate_mobile_country_code',
	whatsapp_number         : 'whatsapp_country_code',

};

export const getResponseKeysMapping = ({ activeTab = '' }) => REPONSE_KEYS_MAPPING[activeTab];
