import getGeoConstants from '@cogoport/globalization/constants/geo';

const FALLBACK_TIMESTAMP = 0;

const getGeoKeys = () => {
	const geo = getGeoConstants();
	return {
		countryCode         : geo.country.code,
		cogoEntityId        : geo.uuid.parent_entity_id,
		fallBackCountryCode : geo.others.navigations.cogo_one.default_country_code,
	};
};

const checkCountrySpecificChats = ({ eachChat, countryCode, cogoEntityId, fallBackCountryCode }) => {
	const { country_code = '', cogo_entity_id:leadCogoEntityId, user_details } = eachChat || {};
	const { cogo_entity_id = '' } = user_details || {};

	if (!(cogo_entity_id || leadCogoEntityId || country_code)) {
		return countryCode === fallBackCountryCode;
	}

	return (
		cogo_entity_id === cogoEntityId
        || cogo_entity_id === leadCogoEntityId
        || country_code === countryCode
	);
};

const filterAndSortFlashMessages = (flashMessagesData) => {
	const { countryCode, cogoEntityId, fallBackCountryCode } = getGeoKeys();
	return Object.keys(flashMessagesData || {})
		.filter((key) => checkCountrySpecificChats({
			eachChat: flashMessagesData[key],
			countryCode,
			cogoEntityId,
			fallBackCountryCode,
		}))
		.sort((a, b) => Number(b.updated_at || FALLBACK_TIMESTAMP) - Number(a.updated_at || FALLBACK_TIMESTAMP))
		.map((sortedkeys) => flashMessagesData[sortedkeys]);
};

export default filterAndSortFlashMessages;
