import IN from '../constants/geo/IN';
import VN from '../constants/geo/VN';
import GLOBAL_CONSTANTS from '../constants/globals';

const { country_ids } = GLOBAL_CONSTANTS;

const MAPPING = {
	[country_ids.IN] : IN,
	[country_ids.VN] : VN,
};

const getEntityOptions = ({ country_id }) => MAPPING[country_id in MAPPING ? country_id : country_ids.IN];

export default getEntityOptions;
