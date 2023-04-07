import { getCookie } from '@cogoport/utils';

import GLOBAL_CONSTANTS from '../globals.json';

import IN from './IN';
import VN from './VN';

const { country_entity_ids } = GLOBAL_CONSTANTS;

const MAPPING = {
	[country_entity_ids.IN] : IN,
	[country_entity_ids.VN] : VN,
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
