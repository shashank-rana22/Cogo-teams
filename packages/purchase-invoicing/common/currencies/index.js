import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import sort from './sortTabel';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

const PREVIOUS_CURRIENCIES = [];
const OPTIONS_ALL = [];
(countries || []).forEach((country) => {
	if (country.currency_code && !PREVIOUS_CURRIENCIES.includes(country.currency_code)) {
		PREVIOUS_CURRIENCIES.push(country.currency_code);
		OPTIONS_ALL.push({
			label : country.currency_code,
			value : country.currency_code,
			key   : country.currency_code,
		});
	}
});

const prefferdCurrencies = Object.keys(GLOBAL_CONSTANTS.currency_code || {});

const preferredOptions = prefferdCurrencies?.map((item) => ({
	label : item,
	value : item,
	key   : item,
}));

const restOptionsList = OPTIONS_ALL.filter((option) => !prefferdCurrencies.includes(option.key));

const restOptions = sort(restOptionsList, { key: 'label' });
const options = [...preferredOptions, ...restOptions];
export default options;
