import { getOtherDataHelper } from '../../utils/getOtherDataHelper';

const OTHER_KEY_MAPPING = {
	customer_name     : 'customer_name',
	customer_address  : 'customer_address',
	invoice_no        : 'invoice_no',
	invoice_date      : 'invoice_date',
	state_code        : 'customer_state_code',
	consignor_name    : 'consignor_name',
	consignor_address : 'consignor_address',
	customer_gstin    : 'customer_gstin',
	kind_attention    : 'kind_attention',
	consignor_gstin   : 'consignor_gstin',
	consignee_name    : 'consignee_name',
	consignee_address : 'consignee_address',
	consignee_gstin   : 'consignee_gstin',
};

export const getOtherData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData,
		requiredKeysMapping: OTHER_KEY_MAPPING,
	});

	return finalDataObj;
};

const CHARGES_KEYS_MAPPING = {
	total_value_of_supply : 'total_value_of_supply',
	total_taxable_value   : 'total_taxable_value',
	total_discount        : 'total_discount',
	total_cgst_amount     : 'cgst',
	total_sgst_amount     : 'sgst',
	total_igst_amount     : 'igst',
	total                 : 'grand_total',
};

export const getChargesData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData          : customData?.line_items,
		requiredKeysMapping : CHARGES_KEYS_MAPPING,
	});

	return finalDataObj;
};

const ANNEXURE_KEY_MAPPINGS = {
	freight_charges   : 'freight_charges',
	loading_unloading : 'loading_unloading',
	detention         : 'detention',
	others            : 'others',
	total             : 'total',
	cgst              : 'cgst',
	sgst              : 'sgst',
	igst              : 'igst',
	total_amount      : 'total_tax_amount',
};

export const getAnnexureTotalData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData          : customData?.annexure,
		requiredKeysMapping : ANNEXURE_KEY_MAPPINGS,
	});

	return finalDataObj;
};
