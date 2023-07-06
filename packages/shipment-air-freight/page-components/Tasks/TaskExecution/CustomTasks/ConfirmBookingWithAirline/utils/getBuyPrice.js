import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { DEFAULT_INDEX } from '../../../../../constants';

const getBuyPrice = (dataObj, source) => {
	if (dataObj?.validities?.[DEFAULT_INDEX]?.total_price) {
		return `${dataObj?.validities?.[DEFAULT_INDEX]?.currency} ${dataObj?.validities?.[DEFAULT_INDEX]?.total_price}`;
	}
	if (source === 'system_rate') {
		const firstValidity = dataObj?.validities?.[GLOBAL_CONSTANTS.zeroth_index] || {};
		const price = firstValidity?.price || firstValidity?.min_price || '-';
		const currency = dataObj?.validities?.[GLOBAL_CONSTANTS.zeroth_index]?.currency || '-';
		return `${currency} ${price}`;
	}

	if (source === 'flash_booking') {
		const price = dataObj?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.price || '-';
		const currency = dataObj?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.currency || '-';
		return `${currency} ${price}`;
	}

	const price = dataObj?.charges?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.price || '-';
	const currency = dataObj?.charges?.line_items?.[GLOBAL_CONSTANTS.zeroth_index]?.currency || '-';
	return `${currency} ${price}`;
};

export default getBuyPrice;
