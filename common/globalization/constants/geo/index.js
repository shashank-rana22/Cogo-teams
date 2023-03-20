/* eslint-disable valid-typeof */
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
	try {
		const parent_entity_id = typeof window !== 'undefined' ? getCookie('parent_entity_id') : country_entity_ids.IN;
		return MAPPING[parent_entity_id in MAPPING ? parent_entity_id : country_entity_ids.IN];
	} catch (error) {
		console.log('error');
	}

	return false;
};

export default getGeoConstants;
