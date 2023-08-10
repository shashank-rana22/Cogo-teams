import { getOtherDataHelper } from '../../utils/getOtherDataHelper';

const OTHER_KEYS_MAPPING = {
	name_of_receipient      : 'customer_name',
	trip_type               : 'trip_type',
	receipient_address      : 'customer_address',
	truck_no                : 'truck_no',
	receipient_gstin        : 'customer_gstin',
	bill_no                 : 'invoice_no',
	bill_date               : 'invoice_date',
	sac_code                : 'sac_code',
	truck_type              : 'truck_type',
	freight_type            : 'freight_type',
	transporter_vendor_code : 'vendor_code',
	description_of_service  : 'description_of_service',
	delivery_date           : 'delivery_date',
	trip_id                 : 'shipment_id',
	state_code              : 'customer_state_code',
	tax_payable_on_rcm      : 'tax_payable',
};
const TARGET_LENGTH = 2;
const MONTH_OFFSET = 1;

export const getOtherData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData,
		requiredKeysMapping: OTHER_KEYS_MAPPING,
	});
	const del_date = finalDataObj?.delivery_date
		? new Date(finalDataObj?.delivery_date)
		: '';

	finalDataObj.delivery_month = del_date
		? `${(del_date.getMonth() + MONTH_OFFSET || '')?.toString()?.padStart(TARGET_LENGTH, '0')}/${del_date
			?.getFullYear()
			?.toString()}`
		: '';
	return finalDataObj;
};

const CHARGES_KEYS_MAPPING = {
	total_packages                    : 'package_count',
	total_freight_rate                : 'total_rate',
	total_weight                      : 'total_weight',
	total_loading_unloading_detention : 'total_detention',
	total_unloading                   : 'total_unloading',
	total_others                      : 'total_others',
	total_value_of_supply             : 'total_value_of_supply',
	cgst                              : 'cgst',
	sgst                              : 'sgst',
	igst                              : 'igst',
	grand_total                       : 'grand_total',
};

export const getChargesData = ({ customData = {} }) => {
	const finalDataObj = getOtherDataHelper({
		customData          : customData?.line_items,
		requiredKeysMapping : CHARGES_KEYS_MAPPING,
	});
	return finalDataObj;
};
