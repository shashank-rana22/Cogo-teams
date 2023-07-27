import { getByKey } from '@cogoport/utils';

import CN from '../../constants/geo/CN';
import ID from '../../constants/geo/ID';
import IN from '../../constants/geo/IN';
import SG from '../../constants/geo/SG';
import TH from '../../constants/geo/TH';
import VN from '../../constants/geo/VN';
import getCountryDetails from '../getCountryDetails';

const COUNTRY_SPECIFIC_DATA = {
	IN : IN.others,
	VN : VN.others,
	SG : SG.others,
	TH : TH.others,
	ID : ID.others,
	CN : CN.others,
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
	country_id = '',
	accessor = '',
	accessorType = '',
	isDefaultData = true,
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
