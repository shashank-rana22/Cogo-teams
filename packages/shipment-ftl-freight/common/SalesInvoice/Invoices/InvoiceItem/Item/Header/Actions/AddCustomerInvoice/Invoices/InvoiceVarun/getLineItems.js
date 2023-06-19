import { lineItemsHelper } from '../../utils/lineItemsHelper';

const LINE_ITEMS_KEYS_MAPPING = {
	gr_number               : 'gr_number',
	outward_delivery_number : 'outward_delivery_no',
	outward_delivery_date   : 'outward_delivery_date',
	inward_delivery_number  : 'inward_delivery_no',
	inward_delivery_date    : 'inward_delivery_date',
	location                : 'location',
	consignee_name          : 'consignee_name',
	delivery_quantity       : 'delivery_qty',
	converted_case          : 'converted_case',
	empty_quantity          : 'empty_qty',
	weight                  : 'weight',
	freight_rate            : 'rate',
	detention               : 'detention',
	unloading               : 'unloading',
	others                  : 'others',
	value_of_supply         : 'value_of_supply',
};

export const getLineItems = ({ customData = {} }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		LINE_ITEMS_KEYS_MAPPING,
		customData,
	});

	return { lineItems, LINE_ITEMS_KEYS_MAPPING };
};
