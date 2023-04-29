import { getCookie } from '@cogoport/utils';

import GLOBAL_CONSTANTS from '../globals.json';

import IN from './IN';
import VN from './VN';

const { country_entity_ids, country_ids } = GLOBAL_CONSTANTS;

const MAPPING = {
	[country_entity_ids.IN] : IN,
	[country_entity_ids.VN] : VN,
};

const COUNTRY_ID_MAPPING = {
	[country_ids.IN] : IN,
	[country_ids.VN] : VN,
};

export const getConstantsByCountryCode = ({ country_id }) => COUNTRY_ID_MAPPING[country_id]
|| COUNTRY_ID_MAPPING[country_ids.IN];

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
