import { getOtherDataHelper } from '../../utils/getOtherDataHelper';

const otherKeysMapping = {
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
		requiredKeysMapping: otherKeysMapping,
	});

	return finalDataObj;
};

const chargesKeysMapping = {
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
		requiredKeysMapping : chargesKeysMapping,
	});

	return finalDataObj;
};
