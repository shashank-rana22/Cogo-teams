import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import sort from './sortTabel';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

const previousCurriencies = [];
const optionsAll = [];
(countries || []).forEach((country) => {
	if (country.currency_code && !previousCurriencies.includes(country.currency_code)) {
		previousCurriencies.push(country.currency_code);
		optionsAll.push({
			label : country.currency_code,
			value : country.currency_code,
			key   : country.currency_code,
		});
	}
});

const prefferdCurrencies = Object.keys(GLOBAL_CONSTANTS.currency_code || {});

const prefferedOptons = optionsAll.filter((option) => prefferdCurrencies.includes(option.key));
const restOptionsList = optionsAll.filter((option) => !prefferdCurrencies.includes(option.key));

const restOptions = sort(restOptionsList, { key: 'label' });
const options = [...prefferedOptons, ...restOptions];
export default options;
