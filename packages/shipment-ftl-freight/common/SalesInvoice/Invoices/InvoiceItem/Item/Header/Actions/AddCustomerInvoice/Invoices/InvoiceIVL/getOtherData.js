import { getOtherDataHelper } from '../../utils/getOtherDataHelper';

const OTHER_KEYS_MAPPING = {
	customer_name       : 'customer_name',
	customer_state_code : 'customer_state_code',
	customer_gstin      : 'customer_gstin',
	customer_address    : 'customer_address',
	kind_attention      : 'kind_attention',
	invoice_no          : 'invoice_no',
	invoice_date        : 'invoice_date',
	sac_code            : 'sac_code',
};

export const getOtherData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData,
		requiredKeysMapping: OTHER_KEYS_MAPPING,
	});

	return finalDataObj;
};

const CHARGES_KEYS_MAPPING = {
	sub_total    : 'sub_total',
	igst         : 'igst_rate',
	igst_amount  : 'igst_amount',
	grand_amount : 'grand_total',
};

export const getChargesData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData          : customData?.line_items,
		requiredKeysMapping : CHARGES_KEYS_MAPPING,
	});
	return finalDataObj;
};
