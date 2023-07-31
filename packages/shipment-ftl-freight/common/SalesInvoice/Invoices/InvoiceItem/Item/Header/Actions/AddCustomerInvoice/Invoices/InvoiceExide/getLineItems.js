import { lineItemsHelper } from '../../utils/lineItemsHelper';

const LINE_ITEMS_KEY_MAPPING = {
	service_description : 'service_description',
	description         : 'descritpion',
	sac_code            : 'sac_code',
	value_of_supply     : 'value_of_supply',
	discount            : 'discount',
	taxable_value       : 'taxable_value',
	cgst_rate           : 'cgst_rate',
	cgst_amount         : 'cgst_amount',
	sgst_rate           : 'sgst_rate',
	sgst_amount         : 'sgst_amount',
	igst_rate           : 'igst_rate',
	igst_amount         : 'igst_amount',
	total               : 'total',
};

export const getLineItems = ({ customData = {}, billing_address = {} }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		LINE_ITEMS_KEY_MAPPING,
		customData,
	});

	lineItems.forEach((item) => {
		const newItem = item;
		newItem.service_description = billing_address?.service_description || '';
		newItem.description = 'Fixed';
	});

	return { lineItems, LINE_ITEMS_KEY_MAPPING };
};

const ANNEXURE_KEY_MAPPINGS = {
	trip_id                             : 'shipment_id',
	consignor_name_slash_consignee_name : 'consignor_slash_consignee_name',
	from_to_town                        : 'from_to_town',
	invoice_number                      : 'invoice_no',
	truck_number                        : 'truck_no',
	gcn_number                          : 'gcn_no',
	date                                : 'gcn_date',
	freight_charges                     : 'freight_charges',
	loading_unloading                   : 'loading_unloading',
	detention                           : 'detention',
	others                              : 'others',
	total                               : 'total',
	cgst                                : 'cgst',
	sgst                                : 'sgst',
	igst                                : 'igst',
	total_amount                        : 'total_tax_amount',
};

export const getAnnexureData = ({ customData = {} }) => {
	const annexure = !Array.isArray(customData?.annexure)
		? [customData?.annexure]
		: customData?.annexure;
	const annexureItems = lineItemsHelper({
		lineItems              : annexure,
		LINE_ITEMS_KEY_MAPPING : ANNEXURE_KEY_MAPPINGS,
		customData,
	});

	return { annexureItems, ANNEXURE_KEY_MAPPINGS };
};
