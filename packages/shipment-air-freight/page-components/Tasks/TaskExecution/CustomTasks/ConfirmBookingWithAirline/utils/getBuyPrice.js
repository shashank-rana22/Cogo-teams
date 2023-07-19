import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getBuyPrice = (dataObj) => {
	const buy_price = getFormattedPrice(
		dataObj?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.price,
		dataObj?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.currency,
	);
	return buy_price;
};

export default getBuyPrice;
