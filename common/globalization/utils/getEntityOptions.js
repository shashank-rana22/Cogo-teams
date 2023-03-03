import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

import IN from '../constants/geo/IN';
import VN from '../constants/geo/VN';

const { country_ids } = GLOBAL_CONSTANTS;

const MAPPING = {
	[country_ids.IN] : IN,
	[country_ids.VN] : VN,
};

const getEntityOptions = ({ country_id }) => MAPPING[country_id in MAPPING ? country_id : country_ids.IN];

export default getEntityOptions;
