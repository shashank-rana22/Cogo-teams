import { getOtherDataHelper } from '../../utils/getOtherDataHelper';

const OTHER_KEYS_MAPPING = {
	customer_name           : 'customer_name',
	customer_gstin          : 'customer_gstin',
	customer_address        : 'customer_address',
	customer_invoice_number : 'invoice_no',
	invoice_date            : 'invoice_date',
};

export const getOtherData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData,
		requiredKeysMapping: OTHER_KEYS_MAPPING,
	});

	return finalDataObj;
};

const CHARGES_KEYS_MAPPING = {
	total_loading_weight       : 'total_loading_weight',
	total_charged_weight       : 'total_charged_weight',
	total_unloading_weight     : 'total_unloading_weight',
	total_freight_amount       : 'total_freight',
	total_detention_at_factory : 'total_detention_at_factory',
	net_total_amount           : 'total_amount',
	total_excess_wt            : 'total_excess_weight',
	total_short_weight         : 'total_short_weight',
	igst                       : 'igst',
	igst_amount                : 'igst_amount',
	cgst                       : 'cgst',
	cgst_amount                : 'cgst_amount',
	sgst                       : 'sgst',
	sgst_amount                : 'sgst_amount',
	grand_total                : 'grand_total',
};

export const getChargesData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData          : customData?.line_items,
		requiredKeysMapping : CHARGES_KEYS_MAPPING,
	});
	return finalDataObj;
};
