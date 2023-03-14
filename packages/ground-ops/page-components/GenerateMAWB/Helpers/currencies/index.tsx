import countries from './countries.json';
import sort from './sortTabel';

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
const prefferdCurrencies = ['INR', 'USD', 'GBP', 'EUR'];
const prefferedOptons = optionsAll.filter((option) => prefferdCurrencies.includes(option.key));
const restOptionsList = optionsAll.filter((option) => !prefferdCurrencies.includes(option.key));
const restOptions = sort(restOptionsList, { key: 'label' });
const options = [...prefferedOptons, ...restOptions];
export default options;
