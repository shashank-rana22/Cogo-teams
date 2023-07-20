import getGeoConstants from '@cogoport/globalization/constants/geo';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

const getIncoterm = (origin, destination) => {
	const { country: { id: countryId = '' } } = getGeoConstants();

	const INDIA_COUNTRY_CODE = getCountryDetails({
		country_id: countryId,
	}).country_code;

	if (origin?.country_code !== INDIA_COUNTRY_CODE && destination?.country_code === INDIA_COUNTRY_CODE) {
		return 'fob';
	}

	return 'cif';
};
export default getIncoterm;
