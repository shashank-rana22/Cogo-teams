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
const getResponseKeysMapping = ({ activeTab = '' }) => REPONSE_KEYS_MAPPING[activeTab];

export default getResponseKeysMapping;
