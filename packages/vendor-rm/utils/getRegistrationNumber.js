import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getPanFromGst from './getPanFromGst';

const getRegistrationNumber = ({ values = {} }) => {
	const { country_id: countryId = '', countrywise_tax = {} } = values;

	let { registrationNumber } = countrywise_tax;
	if (countryId === GLOBAL_CONSTANTS.country_ids.IN) {
		registrationNumber = getPanFromGst(countrywise_tax.registrationNumber);
	}

	return registrationNumber.toUpperCase();
};

export default getRegistrationNumber;
