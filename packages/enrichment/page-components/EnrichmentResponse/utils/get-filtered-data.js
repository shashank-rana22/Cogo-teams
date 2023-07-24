const getByKey = (obj, key) => (obj && obj[key]) || '__';

const getFilteredData = ({ list = [], activeTab = '', LABEL_KEYS = [] }) => {
	const data = (list || []).map((response) => {
		const details = (LABEL_KEYS || []).reduce((acc, key) => {
			acc[key] = getByKey(response, key);
			return acc;
		}, {});

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

	return data;
};

export default getFilteredData;
