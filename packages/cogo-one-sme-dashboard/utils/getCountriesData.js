import { COUNTRIES_TO_SHOW } from '../constants';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

function getCountriesData() {
	return countries.filter(
		(itm) => COUNTRIES_TO_SHOW.includes(itm?.country_code),
	);
}

export default getCountriesData;
