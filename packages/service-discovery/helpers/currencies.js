// eslint-disable-next-line import/no-relative-packages
import countries from '../../../.data-store/constants/countries.json';

import sort from './sortTabel';

const PREV = [];
const OPTIONS = [];
(countries || []).forEach((country) => {
	if (country.currency_code && !PREV.includes(country.currency_code)) {
		PREV.push(country.currency_code);
		OPTIONS.push({
			label : country.currency_code,
			value : country.currency_code,
			key   : country.currency_code,
		});
	}
});
const prefferdCurrencies = ['INR', 'USD', 'GBP', 'EUR'];
const prefferedOptons = OPTIONS.filter((option) => prefferdCurrencies.includes(option.key));
const restOptionsList = OPTIONS.filter((option) => !prefferdCurrencies.includes(option.key));
const restOptions = sort(restOptionsList, { key: 'label' });
const options = [...prefferedOptons, ...restOptions];
export default options;
