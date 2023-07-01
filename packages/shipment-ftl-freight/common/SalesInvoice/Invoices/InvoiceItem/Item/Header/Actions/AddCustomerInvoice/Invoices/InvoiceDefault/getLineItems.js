import { lineItemsHelper } from '../../utils/lineItemsHelper';

const LINE_ITEMS_KEY_MAPPINGS = {
	shipment_id         : 'shipment_id',
	gcn_no              : 'gcn_no',
	delivery_qty        : 'delivery_qty',
	truck_no            : 'truck_no',
	from_town           : 'from_town',
	to_town             : 'to_town',
	arrival_date        : 'arrival_date',
	charged_weight      : 'charged_weight',
	rate                : 'rate',
	freight             : 'freight',
	loading             : 'loading',
	unloading           : 'unloading',
	loading_detention   : 'loading_detention',
	unloading_detention : 'unloading_detention',
	other_charges       : 'other_charges',
};

export const getLineItems = ({ customData = {} }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		LINE_ITEMS_KEY_MAPPINGS,
		customData,
	});

	return { lineItems, LINE_ITEMS_KEY_MAPPINGS };
};
