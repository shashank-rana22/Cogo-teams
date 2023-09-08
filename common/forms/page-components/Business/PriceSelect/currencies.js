import { sortBy } from '@cogoport/utils';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

const PREVIOUS_CURRENCIES = [];
const ALL_OPTIONS = [];

(countries || []).forEach((country) => {
	if (country.currency_code && !PREVIOUS_CURRENCIES.includes(country.currency_code)) {
		PREVIOUS_CURRENCIES.push(country.currency_code);
		ALL_OPTIONS.push({
			label : country.currency_code,
			value : country.currency_code,
		});
	}
});
const prefferdCurrencies = ['INR', 'USD', 'GBP', 'EUR'];
const prefferedOptons = ALL_OPTIONS.filter((option) => prefferdCurrencies.includes(option.value));
const restOptionsList = ALL_OPTIONS.filter((option) => !prefferdCurrencies.includes(option.value));
const restOptions = sortBy(restOptionsList, ['label']);
const options = [...prefferedOptons, ...restOptions];
export default options;
