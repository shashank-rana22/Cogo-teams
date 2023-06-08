import getDate from '../../commons/utils/getDate';

const SHIPPER = 'shipper';
const CONSIGNEE = 'consignee';

const TAX_MECHANISM_MAPPING = {
	forward_charge_mechanism : 'fcm',
	reverse_charge_mechanism : 'rcm',
};

const FTL_FREIGHT_SERVICE = 'ftl_freight_service';
const BAS_CODE = 'BAS';

export const getFormatPrefillValues = ({ data = {}, invoice = {} }) => {
	// customer
	const customer = data?.list?.find((item) => item?.trade_party_type === SHIPPER) || {};
	const {
		address: customer_address = [],
		trade_partner_details: customer_tp_details = {},
		trade_party_id = '',
	} = customer;

	const customer_address_fill = customer_address.find((item) => item?.trade_party_type === SHIPPER) || {};
	const {
		tax_number: customer_tax_number = '',
		address: customer_custom_address = '',
	} = customer_address_fill;

	// consignee
	const consignee = data?.list?.find((item) => item?.trade_party_type === CONSIGNEE) || {};
	const {
		address: consignee_address = [],
		trade_partner_details: consignee_tp_details = {},
	} = consignee;

	const consignee_address_fill = consignee_address.find((item) => item?.trade_party_type === CONSIGNEE)
		|| {};
	const {
		tax_number: consignee_tax_number = '',
		address: consignee_custom_address = '',
	} = consignee_address_fill;

	// other
	const { billing_address = {}, services = [] } = invoice;
	const { tax_mechanism = '' } = billing_address;

	const main_service = services.find(
		(item) => item?.detail?.main_service_id === null
				&& item?.service_type === FTL_FREIGHT_SERVICE,
	) || {};
	const { detail = {}, line_items = [] } = main_service;
	const {
		truck_number = '',
		weight = '',
		gcn_number = '',
		driver_details = {},
		pickup_date = '',
		eway_bill_details = [],
		commodity = '',
		grn_number = '',
		grn_date = '',
		outward_delivery_number = '',
		outward_delivery_date = '',
		inward_delivery_number = '',
		inward_delivery_date = '',
		delivery_date = '',
		detention_days = '',
		packages_count = '',
		permit_number = '',
		converted_case = '',
		lr_numbers = [],
	} = detail;
	const bas_rate = line_items.find((item) => item?.code === BAS_CODE)?.price_discounted || '';

	const obj = {
		customer_organization  : trade_party_id,
		customer_name          : customer_tp_details?.business_name || '',
		customer_gstin         : customer_tax_number,
		customer_address       : customer_custom_address,
		customer_pan           : customer_tp_details?.registration_number || '',
		business_mode          : TAX_MECHANISM_MAPPING[tax_mechanism] || '',
		consignee_name         : consignee_tp_details?.business_name || '',
		consignee_address      : consignee_custom_address,
		consignee_gstin        : consignee_tax_number,
		consignor_name         : customer_tp_details?.business_name || '',
		consignor_address      : customer_custom_address,
		consignor_gstin        : customer_tax_number,
		rate_type              : 'Fixed',
		truck_no               : truck_number,
		actual_weight          : weight,
		charged_weight         : weight,
		rate                   : bas_rate?.toFixed(2),
		gcn_no                 : gcn_number || lr_numbers?.[0],
		value_of_goods         : bas_rate?.toFixed(2),
		driver_mobile          : driver_details?.contact,
		driver_name            : driver_details?.name,
		pickup_date_time       : getDate(pickup_date),
		eway_bill_no           : eway_bill_details?.[0]?.eway_bill_number,
		commodity_type         : commodity || '',
		grn_number,
		grn_date               : getDate(grn_date),
		outward_delivery_no    : outward_delivery_number || '',
		outward_delivery_date  : getDate(outward_delivery_date),
		inward_delivery_number : getDate(inward_delivery_number),
		inward_delivery_date   : getDate(inward_delivery_date),
		delivery_date          : getDate(delivery_date),
		detention_days,
		package_count          : packages_count,
		permit_no              : permit_number,
		converted_case,
	};

	return obj;
};
