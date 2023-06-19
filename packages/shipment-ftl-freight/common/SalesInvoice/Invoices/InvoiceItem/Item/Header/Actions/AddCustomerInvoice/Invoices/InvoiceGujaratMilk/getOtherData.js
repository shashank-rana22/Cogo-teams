import { getOtherDataHelper } from '../../utils/getOtherDataHelper';

const OTHER_KEYS_MAPPING = {
	customer_name     : 'customer_name',
	customer_address  : 'customer_address',
	invoice_no        : 'invoice_no',
	invoice_date      : 'invoice_date',
	state_code        : 'customer_state_code',
	consignor_name    : 'consignor_name',
	consignor_address : 'consignor_address',
	customer_gstin    : 'customer_gstin',
	value_of_goods    : 'value_of_goods',
	kind_attention    : 'kind_attention',
	consignor_gstin   : 'consignor_gstin',
	consignee_name    : 'consignee_name',
	consignee_address : 'consignee_address',
	consignee_gstin   : 'consignee_gstin',
	grn_number        : 'grn_number',
	grn_date          : 'grn_date',
	po_number         : 'po_number',
	po_date           : 'po_date',
	truck_type        : 'truck_type',
};

export const getOtherData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData,
		requiredKeysMapping: OTHER_KEYS_MAPPING,
	});

	return finalDataObj;
};

const CHARGES_KEYS_MAPPING = {
	total_value_of_supply      : 'total_value_of_supply',
	total_taxable_value        : 'total_taxable_value',
	total_discount             : 'total_discount',
	total_cgst_amount          : 'cgst',
	total_sgst_amount          : 'sgst',
	total_igst_amount          : 'igst',
	total_other_charges_amount : 'total_other_charges',
	total                      : 'grand_total',
};

export const getChargesData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData          : customData?.line_items,
		requiredKeysMapping : CHARGES_KEYS_MAPPING,
	});
	return finalDataObj;
};
