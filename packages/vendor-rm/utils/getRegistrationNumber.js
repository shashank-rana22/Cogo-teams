import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';

import getPanFromGst from './getPanFromGst';

const getRegistrationNumber = ({ values = {} }) => {
	const { country_id: countryId = '', countrywise_tax = {} } = values;

	let { registrationNumber } = countrywise_tax;

	const patternValue = getCountrySpecificData({
		country_id    : countryId,
		accessorType  : 'pan_number',
		accessor      : 'pattern',
		isDefaultData : false,
	});

	if (patternValue) {
		registrationNumber = getPanFromGst(countrywise_tax.registrationNumber);
	}

	return registrationNumber.toUpperCase();
};

export default getRegistrationNumber;
