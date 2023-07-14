// eslint-disable-next-line
import countries from '@/data-store/constants/countries.json';

export const countriesHash = countries.reduce(
	(pv, acc) => ({ ...pv, [acc.id]: acc }),
	{},
);

export const countrieCodeHash = countries.reduce(
	(pv, acc) => ({ ...pv, [acc.country_code]: acc }),
	{},
);
