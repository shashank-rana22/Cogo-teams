import sort from './sortTabel';

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
			key   : country.currency_code,
		});
	}
});
const prefferdCurrencies = ['INR', 'USD', 'GBP', 'EUR'];
const prefferedOptons = ALL_OPTIONS.filter((option) => prefferdCurrencies.includes(option.key));
const restOptionsList = ALL_OPTIONS.filter((option) => !prefferdCurrencies.includes(option.key));
const restOptions = sort(restOptionsList, { key: 'label' });
const currencyOptions = [...prefferedOptons, ...restOptions];
export default currencyOptions;
