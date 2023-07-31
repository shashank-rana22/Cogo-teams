import { lineItemsHelper } from '../../utils/lineItemsHelper';
import { CUSTOMER_TO_SERVICE_DESCRIPTION } from '../../utils/serviceDescriptionMappings';

const LINE_ITEMS_KEYS_MAPPING = {
	service_description   : 'service_description',
	description           : 'descritpion',
	sac_code              : 'sac_code',
	permit_details        : 'permit_no',
	submission_of_weights : 'weight',
	rate                  : 'rate',
	value_of_supply       : 'value_of_supply',
	cgst_rate             : 'cgst_rate',
	cgst_amount           : 'cgst_amount',
	sgst_rate             : 'sgst_rate',
	sgst_amount           : 'sgst_amount',
	igst_rate             : 'igst_rate',
	igst_amount           : 'igst_amount',
	other_charges         : 'others',
	total                 : 'total',
};

export const getLineItems = ({ customData = {}, importerExporterId = '' }) => {
	const lineItems = lineItemsHelper({
		lineItems: customData?.line_items?.line_items,
		LINE_ITEMS_KEYS_MAPPING,
		customData,
	});

	lineItems.forEach((item) => {
		const newItem = item;
		newItem.service_description = CUSTOMER_TO_SERVICE_DESCRIPTION[importerExporterId] || '';
		newItem.description = 'Fixed';
	});

	return { lineItems, LINE_ITEMS_KEYS_MAPPING };
};

const ANNEXURE_KEY_MAPPINGS = {
	trip_id       : 'shipment_id',
	trip_date     : 'trip_date',
	truck_number  : 'truck_no',
	gcn_number    : 'gcn_no',
	permit_number : 'permit_no',
	from_town     : 'from_town',
	to_town       : 'to_town',
	weight        : 'weight',
	rate          : 'rate',
	total_amount  : 'total',
};

export const getAnnexureData = ({ customData = {} }) => {
	const annexure = !Array.isArray(customData?.annexure)
		? [customData?.annexure]
		: customData?.annexure;
	const annexureItems = lineItemsHelper({
		lineItems               : annexure,
		LINE_ITEMS_KEYS_MAPPING : ANNEXURE_KEY_MAPPINGS,
		customData,
	});

	return { annexureItems, ANNEXURE_KEY_MAPPINGS };
};
