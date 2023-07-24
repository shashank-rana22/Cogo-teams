import countries from '../helpers/countries.json';
import sort from '../helpers/sortTabel';

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
const prefferdCurrencies = ['INR', 'USD', 'GBP', 'EUR'];
const prefferedOptons = OPTIONS_ALL.filter((option) => prefferdCurrencies.includes(option.key));
const restOptionsList = OPTIONS_ALL.filter((option) => !prefferdCurrencies.includes(option.key));
const restOptions = sort(restOptionsList, { key: 'label' });
const currencyCodeOptions = [...prefferedOptons, ...restOptions];
export default currencyCodeOptions;
