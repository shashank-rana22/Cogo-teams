import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const geo = getGeoConstants();
const countryCode = geo?.country?.code;
const cogoEntityId = GLOBAL_CONSTANTS.country_entity_ids?.[countryCode];
const FALLBACK_COUNTRY = 'IN';

const checkCountrySpecificChats = (eachChat) => {
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

const filterAndSortFlashMessages = (flashMessagesData) => Object.keys(flashMessagesData || {})
	.filter((key) => checkCountrySpecificChats(flashMessagesData[key]))
	.sort((a, b) => Number(b.updated_at || 0) - Number(a.updated_at || 0))
	.map((sortedkeys) => flashMessagesData[sortedkeys]);

export default filterAndSortFlashMessages;
