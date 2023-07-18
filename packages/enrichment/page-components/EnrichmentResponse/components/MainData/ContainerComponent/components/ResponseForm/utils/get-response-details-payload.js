const getByKey = (obj, key) => (obj && obj[key]) || undefined;

const getResponseDetailsPayload = ({ values, query, activeTab = '' }) => ({
	...values,
	mobile_country_code           : getByKey(values?.mobile_number, 'country_code'),
	mobile_number                 : getByKey(values?.mobile_number, 'number'),
	alternate_mobile_country_code : getByKey(
		values?.alternate_mobile_number,
		'country_code',
	),
	alternate_mobile_number: getByKey(
		values?.alternate_mobile_number,
		'number',
	),
	whatsapp_country_code : getByKey(values?.whatsapp_number, 'country_code'),
	whatsapp_number       : getByKey(values?.whatsapp_number, 'number'),
	response_type         : 'user',
	source                : 'manual',
	feedback_request_id   : getByKey(query, 'id'),

});

export default getResponseDetailsPayload;
