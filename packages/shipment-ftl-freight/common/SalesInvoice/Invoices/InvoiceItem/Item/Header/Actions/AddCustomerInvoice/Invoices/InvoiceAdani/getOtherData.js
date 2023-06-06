import { getOtherDataHelper } from '../../utils/getOtherDataHelper';

const otherKeysMapping = {
	customer_name    : 'customer_name',
	customer_address : 'customer_address',
	state_code       : 'customer_state_code',
	pan_number       : 'customer_pan_number',
	gst_number       : 'customer_gstin',
	invoice_no       : 'invoice_no',
	sac_code         : 'sac_code',
	bill_date        : 'invoice_date',
};

export const getOtherData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData,
		requiredKeysMapping: otherKeysMapping,
	});

	return finalDataObj;
};

const chargesKeysMapping = {
	cgst        : 'cgst',
	sgst        : 'sgst',
	igst        : 'total_tax',
	grand_total : 'total_tax_amount',
};

export const getChargesData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData,
		requiredKeysMapping: chargesKeysMapping,
	});
	return finalDataObj;
};
