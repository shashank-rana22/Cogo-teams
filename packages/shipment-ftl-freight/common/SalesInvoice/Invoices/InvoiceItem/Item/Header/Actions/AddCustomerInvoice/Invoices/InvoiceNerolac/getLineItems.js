import { lineItemsHelper } from '../../utils/lineItemsHelper';

const LINE_ITEMS_KEYS_MAPPING = {
	gr_number                   : 'gr_number',
	gr_date                     : 'gr_date',
	sc_number                   : 'sc_number',
	location                    : 'location',
	consignee_name              : 'consignee_name',
	packages                    : 'package_count',
	weight                      : 'weight',
	freight_rate                : 'rate',
	loading_unloading_detention : 'detention',
	unloading                   : 'unloading',
	others                      : 'others',
	value_of_supply             : 'value_of_supply',
};

export const getLineItems = ({ customData = {} }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		LINE_ITEMS_KEYS_MAPPING,
		customData,
	});

	return { lineItems, LINE_ITEMS_KEYS_MAPPING };
};
