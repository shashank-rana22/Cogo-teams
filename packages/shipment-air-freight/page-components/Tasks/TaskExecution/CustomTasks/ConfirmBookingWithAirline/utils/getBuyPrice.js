import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getBuyPrice = (dataObj) => {
	const currency = dataObj?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.buy_currency
	|| dataObj?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.currency;
	const buy_price = getFormattedPrice(
		dataObj?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.price,
		currency,
	);
	return buy_price;
};

export default getBuyPrice;
