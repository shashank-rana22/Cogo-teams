import { getOtherDataHelper } from '../../utils/getOtherDataHelper';

const OTHERS_KEY_MAPPING = {
	customer_name       : 'customer_name',
	customer_address    : 'customer_address',
	customer_pan        : 'customer_pan',
	customer_gstin      : 'customer_gstin',
	customer_state_code : 'customer_state_code',
	invoice_no          : 'invoice_no',
	invoice_date        : 'invoice_date',
	place_of_supply     : 'place_of_supply',
};

export const getOtherData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData,
		requiredKeysMapping: OTHERS_KEY_MAPPING,
	});

	return finalDataObj;
};

const CHARGES_KEY_MAPPING = {
	total_amount : 'total_amount',
	cgst         : 'cgst',
	sgst         : 'sgst',
	igst         : 'igst',
	total_others : 'total_others',
	grand_total  : 'grand_total',
};

export const getChargesData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData          : customData?.line_items,
		requiredKeysMapping : CHARGES_KEY_MAPPING,
	});

	return finalDataObj;
};
