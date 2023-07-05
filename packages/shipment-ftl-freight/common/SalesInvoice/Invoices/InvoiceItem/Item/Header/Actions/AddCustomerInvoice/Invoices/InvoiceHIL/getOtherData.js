import { getOtherDataHelper } from '../../utils/getOtherDataHelper';

const OTHER_KEYS_MAPPING = {
	customer_name          : 'customer_name',
	customer_address       : 'customer_address',
	customer_state_code    : 'customer_state_code',
	customer_gstin         : 'customer_gstin',
	invoice_no             : 'invoice_no',
	invoice_date           : 'invoice_date',
	description_of_service : 'description_of_service',
};

export const getOtherData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData,
		requiredKeysMapping: OTHER_KEYS_MAPPING,
	});

	return finalDataObj;
};

const CHARGES_KEYS_MAPPING = {
	total_weight         : 'total_weight',
	total_freight_amount : 'total_freight',
	total_igst_amount    : 'igst',
	total_others_amount  : 'total_others_amount',
	total                : 'grand_total',
};

export const getChargesData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData          : customData?.line_items,
		requiredKeysMapping : CHARGES_KEYS_MAPPING,
	});
	return finalDataObj;
};
