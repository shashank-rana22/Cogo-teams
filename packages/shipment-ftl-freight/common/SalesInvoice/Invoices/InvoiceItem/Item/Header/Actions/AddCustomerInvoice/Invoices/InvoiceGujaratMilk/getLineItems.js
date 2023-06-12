import { lineItemsHelper } from '../../utils/lineItemsHelper';
import { customerToServiceDescription } from '../../utils/serviceDescriptionMappings';

const lineItemsKeysMapping = {
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
	other_charges       : 'other_charges',
	total               : 'total',
};

export const getLineItems = ({ customData = {}, importerExporterId = '' }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		lineItemsKeysMapping,
		customData,
	});

	lineItems.forEach((item) => {
		const newItem = item;
		newItem.service_description =			customerToServiceDescription[importerExporterId] || '';
		newItem.description = 'Fixed';
	});

	return { lineItems, lineItemsKeysMapping };
};

const annexureKeyMappings = {
	trip_id        : 'shipment_id',
	truck_number   : 'truck_no',
	from_town      : 'from_town',
	to_town        : 'to_town',
	actual_weight  : 'actual_weight',
	charged_weight : 'charged_weight',
	rate           : 'rate',
	gcn_no         : 'gcn_no',
	gcn_date       : 'gcn_date',
};

export const getAnnexureData = ({ customData = {} }) => {
	const annexure = !Array.isArray(customData?.annexure)
		? [customData?.annexure]
		: customData?.annexure;
	const annexureItems = lineItemsHelper({
		lineItems            : annexure,
		lineItemsKeysMapping : annexureKeyMappings,
		customData,
	});

	return { annexureItems, annexureKeyMappings };
};
