// eslint-disable-next-line import/no-relative-packages
import countryCodes from '../../../.data-store/constants/countries.json';

// eslint-disable-next-line max-len
export const getCountryId = (countryCode = '') => countryCodes.find(({ country_code }) => country_code === countryCode)?.id;
