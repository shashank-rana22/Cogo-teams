import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

const getCountryCode = ({ country_id }) => {
	const countryDetails = getCountryDetails({ country_id });

	return countryDetails.country_code || null;
};

export default getCountryCode;
