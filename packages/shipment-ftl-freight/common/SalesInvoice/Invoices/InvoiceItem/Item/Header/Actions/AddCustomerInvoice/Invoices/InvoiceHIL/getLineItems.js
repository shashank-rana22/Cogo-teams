import { lineItemsHelper } from '../../utils/lineItemsHelper';

const LINE_ITEMS_KEYS_MAPPING = {
	description   : 'description',
	sac_code      : 'sac_code',
	trip_id       : 'shipment_id',
	date          : 'gcn_date',
	from          : 'from_town',
	to            : 'to_town',
	vehicle_no    : 'truck_no',
	lr_number     : 'gcn_no',
	invoice_no    : 'invoice_no',
	po_number     : 'po_number',
	load_weight   : 'load_weight',
	weight        : 'weight',
	rate          : 'rate',
	freight       : 'freight',
	igst_rate     : 'igst_rate',
	igst_amount   : 'igst_amount',
	other_charges : 'other_charges',
	total         : 'total',
};

export const getLineItems = ({ customData = {} }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		LINE_ITEMS_KEYS_MAPPING,
		customData,
	});

	lineItems.forEach((item) => {
		const newItem = item;
		newItem.description = 'Fixed';
	});

	return { lineItems, LINE_ITEMS_KEYS_MAPPING };
};
