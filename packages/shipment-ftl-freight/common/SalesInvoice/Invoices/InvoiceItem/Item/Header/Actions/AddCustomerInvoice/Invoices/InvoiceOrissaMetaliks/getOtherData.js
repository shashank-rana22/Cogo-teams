import { getOtherDataHelper } from '../../utils/getOtherDataHelper';

const otherKeysMapping = {
	customer_name       : 'customer_name',
	customer_address    : 'customer_address',
	customer_gstin      : 'customer_gstin',
	invoice_no          : 'invoice_no',
	invoice_date        : 'invoice_date',
	sac_code            : 'sac_code',
	consignor_name      : 'consignor_name',
	consignee_name      : 'consignee_name',
	customer_state_code : 'customer_state_code',
};

export const getOtherData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData,
		requiredKeysMapping: otherKeysMapping,
	});

	return finalDataObj;
};

const chargesKeysMapping = {
	total_weight          : 'total_weight',
	total_value_of_supply : 'total_value_of_supply',
	total_cgst_amount     : 'cgst',
	total_sgst_amount     : 'sgst',
	total_igst_amount     : 'igst',
	total_other_charges   : 'total_others',
	total                 : 'grand_total',
};

export const getChargesData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData          : customData?.line_items,
		requiredKeysMapping : chargesKeysMapping,
	});
	return finalDataObj;
};
