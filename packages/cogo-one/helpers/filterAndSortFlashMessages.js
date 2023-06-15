import getGeoConstants from '@cogoport/globalization/constants/geo';

const FALLBACK_COUNTRY = 'IN';
const FALLBACK_TIMESTAMP = 0;

const getGeoKeys = () => {
	const geo = getGeoConstants();
	return {
		countryCode  : geo.country.code,
		cogoEntityId : geo.uuid.parent_entity_id,
	};
};

const checkCountrySpecificChats = ({ eachChat, countryCode, cogoEntityId }) => {
	const { country_code = '', cogo_entity_id:leadCogoEntityId, user_details } = eachChat || {};
	const { cogo_entity_id = '' } = user_details || {};

	if (!(cogo_entity_id || leadCogoEntityId || country_code)) {
		return countryCode === FALLBACK_COUNTRY;
	}

	return (
		cogo_entity_id === cogoEntityId
        || cogo_entity_id === leadCogoEntityId
        || country_code === countryCode
	);
};

const filterAndSortFlashMessages = (flashMessagesData) => {
	const { countryCode, cogoEntityId } = getGeoKeys();
	return Object.keys(flashMessagesData || {})
		.filter((key) => checkCountrySpecificChats({ eachChat: flashMessagesData[key], countryCode, cogoEntityId }))
		.sort((a, b) => Number(b.updated_at || FALLBACK_TIMESTAMP) - Number(a.updated_at || FALLBACK_TIMESTAMP))
		.map((sortedkeys) => flashMessagesData[sortedkeys]);
};

export default filterAndSortFlashMessages;
