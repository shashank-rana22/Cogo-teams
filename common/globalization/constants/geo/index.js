import { getCookie } from '@cogoport/utils';

import getCountryDetails from '../../utils/getCountryDetails';
import GLOBAL_CONSTANTS from '../globals';

import IN from './IN';
import VN from './VN';

const { country_entity_ids } = GLOBAL_CONSTANTS;

export const ENTITY_IDS_MAPPING = {
	[country_entity_ids.IN] : IN,
	[country_entity_ids.VN] : VN,
};

const COUNTRY_ID_MAPPING = {
	IN,
	VN,
};

export const getCountryConstants = ({ country_id, country_code, isDefaultData = true }) => {
	const countryData = getCountryDetails({ country_id, country_code });

	const { country_code: countryCode } = countryData || {};

	const isCountryCodeValid = countryCode in COUNTRY_ID_MAPPING;

	if (isDefaultData) {
		return COUNTRY_ID_MAPPING[isCountryCodeValid ? countryCode : 'IN'];
	}

	return isCountryCodeValid ? COUNTRY_ID_MAPPING[countryCode] : {};
};

const getGeoConstants = () => {
	if (typeof window === 'undefined') {
		return null;
	}

	const parent_entity_id = getCookie('parent_entity_id');

	return ENTITY_IDS_MAPPING[
		parent_entity_id in ENTITY_IDS_MAPPING ? parent_entity_id : country_entity_ids.IN
	];
};

export default getGeoConstants;
