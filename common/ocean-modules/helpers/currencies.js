import { countriesHash } from '@cogoport/globalization/utils/getCountriesHash';

import sort from './sortTabel';

const PREVIOUS_CURRENCIES = [];
const OPTIONS_ALL = [];

const PREFERRED_CURRENCIES = ['INR', 'USD', 'GBP', 'EUR'];

(Object.values(countriesHash) || []).forEach((country) => {
	if (
		country?.currency_code
		&& !PREVIOUS_CURRENCIES.includes(country?.currency_code)
	) {
		PREVIOUS_CURRENCIES.push(country?.currency_code);
		OPTIONS_ALL.push({
			label : country?.currency_code,
			value : country?.currency_code,
			key   : country?.currency_code,
		});
	}
});

const preferredOptons = OPTIONS_ALL?.filter((option) => PREFERRED_CURRENCIES.includes(option?.key));

const restOptionsList = OPTIONS_ALL?.filter(
	(option) => !PREFERRED_CURRENCIES.includes(option?.key),
);
const restOptions = sort(restOptionsList, { key: 'label' });

const options = [...preferredOptons, ...restOptions];

export default options;
