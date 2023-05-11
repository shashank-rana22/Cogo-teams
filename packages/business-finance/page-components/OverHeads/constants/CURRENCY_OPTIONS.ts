import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';


export const CURRENCY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.currency_code).map((currency)=>{
	return {label:currency,
	value:currency}
});
