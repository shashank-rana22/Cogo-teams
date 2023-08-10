import { getByKey } from '@cogoport/utils';

import IN from '../../constants/geo/IN';
import VN from '../../constants/geo/VN';
import getCountryDetails from '../getCountryDetails';

const COUNTRY_SPECIFIC_DATA = {
	IN : IN.others,
	VN : VN.others,
};

const getCountrySpecificData = ({
	country_id,
	accessor = '',
	accessorType = '',
	isDefaultData = true,
}) => {
	const countryDetails = getCountryDetails({
		country_id,
	}) || {};

	const countryCode = countryDetails.country_code;

	let defaultCountryCode = countryCode;

	if (!(countryCode in COUNTRY_SPECIFIC_DATA)) {
		defaultCountryCode = isDefaultData ? 'IN' : '';
	}

	const data = COUNTRY_SPECIFIC_DATA[defaultCountryCode] || {};

	return getByKey(data[accessorType], accessor) || null;
};

function CountrySpecificData({
	country_id,
	accessor = '',
	accessorType = '',
	isDefaultData,
}) {
	return (
		<>
			{getCountrySpecificData({
				country_id,
				accessor,
				accessorType,
				isDefaultData,
			})}
		</>
	);
}

export { getCountrySpecificData, CountrySpecificData };
