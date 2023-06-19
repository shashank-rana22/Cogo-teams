import { lineItemsHelper } from '../../utils/lineItemsHelper';

const LINE_ITEMS_KEYS_MAPPING = {
	si_no           : 'si_no',
	date            : 'grn_date',
	shipment_number : 'shipment_id',
	invoice_number  : 'customer_invoice_no',
	gr_number       : 'grn_number',
	from            : 'from_town',
	destination     : 'to_town',
	truck_number    : 'truck_no',
	lr_number       : 'gcn_no',
	gross_weight    : 'gross_weight',
	rate            : 'rate',
	total           : 'total',
	deduction       : 'item_discount',
	net_amount      : 'net_amount',
	other_charges   : 'other_charges',
	remark          : 'remark',
};

export const getLineItems = ({ customData = {} }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		LINE_ITEMS_KEYS_MAPPING,
		customData,
	});

	return { lineItems, LINE_ITEMS_KEYS_MAPPING };
};
