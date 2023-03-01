/* eslint-disable import/no-unresolved */
import countryCodes from '../../../.data-store/constants/countries.json';

// eslint-disable-next-line max-len
export const getCountryId = (countryCode = '') => countryCodes.find(({ country_code }) => country_code === countryCode)?.id;
