import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_entity_ids;

const getIncoterm = () => {
	const INDIA_COUNTRY_CODE = getCountryDetails({
		country_id: INDIA_COUNTRY_ID,
	});

	console.log('RRRRR', INDIA_COUNTRY_CODE);
};
export default getIncoterm;
