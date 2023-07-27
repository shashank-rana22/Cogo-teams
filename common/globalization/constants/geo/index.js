import { getCookie } from '@cogoport/utils';

import getCountryDetails from '../../utils/getCountryDetails';
import GLOBAL_CONSTANTS from '../globals';

import CN from './CN';
import ID from './ID';
import IN from './IN';
import SG from './SG';
import TH from './TH';
import VN from './VN';

const { country_entity_ids } = GLOBAL_CONSTANTS;

const MAPPING = {
	[country_entity_ids.IN] : IN,
	[country_entity_ids.VN] : VN,
	[country_entity_ids.SG] : SG,
	[country_entity_ids.TH] : TH,
	[country_entity_ids.ID] : ID,
	[country_entity_ids.CN] : CN,
};

const COUNTRY_ID_MAPPING = {
	IN,
	VN,
	SG,
	TH,
	ID,
	CN,
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

	return MAPPING[
		parent_entity_id in MAPPING ? parent_entity_id : country_entity_ids.IN
	];
};

export default getGeoConstants;
