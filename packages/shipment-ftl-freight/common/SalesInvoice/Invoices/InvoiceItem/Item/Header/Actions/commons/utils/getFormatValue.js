const CUSTOMER_KEYS = [
	'customer_id',
	'customer_name',
	'customer_gstin',
	'customer_address',
	'customer_state_code',
	'customer_pan',
];
const CONSIGNOR_KEYS = [
	'consignor_name',
	'consignor_address',
	'consignor_gstin',
];
const ADDITIONAL_CHARGE_KEYS = [
	'loading_amount',
	'loading_amount_tax',
	'loading_description',
	'unloading_amount',
	'unloading_amount_tax',
	'unloading_amount_description',
	'loading_detention_amount',
	'loading_detention_amount_tax',
	'loading_detention_description',
	'unloading_detention_amount',
	'unloading_detention_amount_tax',
	'unloading_detention_description',
	'incentive_amount',
	'incentive_amount_tax',
	'incentive_description',
	'other_amount',
	'other_amount_tax',
	'other_description',
	'damage_amount',
	'damage_amount_tax',
	'damage_description',
	'shortage_amount',
	'shortage_amount_tax',
	'shortage_description',
	'penalty_amount',
	'penalty_amount_tax',
	'penalty_description',
];

const CONSIGNEE_KEYS = [
	'consignee_name',
	'consignee_address',
	'consignee_gstin',
];

const FLEET_OWNER_KEYS = [
	'fleet_owner_company_pan',
	'fleet_owner_company_name',
	'fleet_owner_company_owner_name',
	'fleet_owner_company_owner_mobile',
	'fleet_owner_company_legal_entity_type',
	'fleet_owner_company_regd_address_pincode',
];

const DRIVER_KEYS = ['driver_dl_number', 'driver_mobile', 'driver_name'];

const DOCUMENT_KEYS = [
	'truck_rc',
	'driver_dl',
	'vendor_pan',
	'gcn',
	'eway_bill',
	'customer_confirmation_email',
	'proof_of_delivery',
	'customer_invoice',
];

export const DATA_OBJECT_KEYS_MAPPING = {
	customer_details    : CUSTOMER_KEYS,
	consignor_details   : CONSIGNOR_KEYS,
	consignee_details   : CONSIGNEE_KEYS,
	fleet_owner_details : FLEET_OWNER_KEYS,
	driver_details      : DRIVER_KEYS,
	trip_documents      : DOCUMENT_KEYS,
	additional_charges  : ADDITIONAL_CHARGE_KEYS,
};

export const getFormatValue = ({
	values = {},
	shipment_id = '',
	invoice_combination_id = '',
}) => {
	const formattedData = {
		shipment_id,
		invoice_combination_id,
	};

	Object.keys(DATA_OBJECT_KEYS_MAPPING).forEach((key) => {
		formattedData[key] = {};
	});

	Object.entries(values).forEach(([rawKey, rawValue]) => {
		const entryAdded = Object.entries(DATA_OBJECT_KEYS_MAPPING).some(
			([objKey, objValue]) => {
				if (Array.isArray(objValue) && objValue.includes(rawKey)) {
					const finalValue = objKey === 'trip_documents' ? rawValue?.finalUrl || rawValue : rawValue;
					formattedData[objKey][rawKey] = finalValue ?? undefined;
					return true;
				}
				return false;
			},
		);
		if (!entryAdded) {
			formattedData[rawKey] = rawValue ?? undefined;
		}
	});

	return formattedData;
};
