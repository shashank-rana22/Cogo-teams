import GLOBAL_CONSTANTS from '../constants/globals.json';

const getCurrencyOptions = () => Object.keys(GLOBAL_CONSTANTS.currency_code).map((currency) => ({
	label : currency,
	value : GLOBAL_CONSTANTS.currency_code[currency],
}));

export default getCurrencyOptions;
