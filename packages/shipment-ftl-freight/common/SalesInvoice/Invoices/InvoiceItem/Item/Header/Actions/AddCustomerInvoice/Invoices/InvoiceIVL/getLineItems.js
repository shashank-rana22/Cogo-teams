import { lineItemsHelper } from '../../utils/lineItemsHelper';

const lineItemsKeysMapping = {
	gc_note                  : 'gcn_no',
	invoice_no               : 'customer_invoice_no',
	invoice_date             : 'invoice_date',
	packages_count           : 'package_count',
	grade                    : 'grade',
	quantity                 : 'delivery_qty',
	truck_no                 : 'truck_no',
	truck_type               : 'truck_type',
	from_station             : 'from_town',
	delivery_station         : 'to_town',
	arrival_date             : 'arrival_date',
	charge_weight            : 'charge_weight',
	rate                     : 'rate',
	freight                  : 'freight',
	loading_unloading_charge : 'loading_unloading',
	detention_charge         : 'detention',
	multipoint_charge        : 'multipoint',
	other_charges            : 'others',
	total_amount             : 'total',
};

export const getLineItems = ({ customData = {} }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		lineItemsKeysMapping,
		customData,
	});

	return { lineItems, lineItemsKeysMapping };
};
