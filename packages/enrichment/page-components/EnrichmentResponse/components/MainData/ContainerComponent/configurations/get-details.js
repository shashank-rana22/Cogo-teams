import getResponseKeysMapping from './response-keys-mapping';

const getByKey = (obj, key) => (obj && obj[key]) || '__';

const getDetails = ({ data = [], activeTab = '' }) => {
	const RESPONSE_KEYS = getResponseKeysMapping({ activeTab });

	const filteredKeys = RESPONSE_KEYS[activeTab];

	const responsData = (data || []).map((response) => {
		const details = filteredKeys.map((key) => ({ key: getByKey(response, key) }));

		const modifiedDetails = {
			...details,
			...(activeTab === 'user' && {
				mobile_number: `${getByKey(response, 'mobile_country_code')}
				${getByKey(response, 'mobile_number')}`,
				alternate_mobile_number: `${getByKey(
					response,
					'alternate_mobile_country_code',
				)}
				${getByKey(response, 'alternate_mobile_number')}`,
				whatsapp_number: `${getByKey(response, 'whatsapp_country_code')} 
			   ${getByKey(response, 'whatsapp_number')}`,
			}),
		};
		return modifiedDetails;
	});

	return responsData;
};

export default getDetails;
