import getGeoConstants from '@cogoport/globalization/constants/geo';

const DEFAULT_VALUE_FOR_TERMINAL_CHARGE = 0;
const DEFAULT_VALUE_FOR_SHEET_INDEX = 1;

const getPayload = ({
	type: taskType = 'terminal', values = {}, mainServicesData = {}, sheetData = {},
	entityData = {}, collectionPartyData = {},
}) => {
	const geo = getGeoConstants();

	const { id = '' } = sheetData || {};

	const {
		business_name = '', cin = '',
		entity_code = '', registration_number = '', tan_no = '', country = {},
		id:cogo_entity_id = '', serial_id = '',
		addresses = [],
	} = entityData || {};

	const {
		business_name: collectionBusinessName = '', registration_number :collectionRegistrationNumber = '',
		billing_addresses = [],
	} = collectionPartyData || {};

	const billingAddress = addresses.find((address) => address.id === values?.billing_address);

	const collectionPartyAddress = billing_addresses.find((address) => address.id === values?.collection_party_address);

	const {
		pincode:collectionPincode = '', address: collectionAddress = '',
		tax_number: collectionTaxNumber = '',
	} = collectionPartyAddress || {};

	const { id:country_id = '', country_code = '', name = '', type = '' } = country || {};

	const { currency = '', mawb_number = '' } = values || {};

	let price = 0;
	let tax_price = 0;
	let total_tax_price = 0;

	(values?.terminalChargeReceipt || []).forEach((val) => {
		price += Number(val.price);
		tax_price += Number(val.tax_price);
		total_tax_price += Number(val.total_tax_price);
	});

	const {
		chargeable_weight = '', airline_id = '', origin_airport_id = '',
		destination_airport_id = '', booking_reference_number = '',
	} = mainServicesData || {};

	const csr_data = [
		{
			airline_id,
			invoice_type : 'purchase_invoice',
			awb_number   : booking_reference_number,
			origin_airport_id,
			destination_airport_id,
			line_items   : [
				{
					total_price     : Number(price),
					other_price     : DEFAULT_VALUE_FOR_TERMINAL_CHARGE,
					discount        : DEFAULT_VALUE_FOR_TERMINAL_CHARGE,
					commission      : DEFAULT_VALUE_FOR_TERMINAL_CHARGE,
					total_tax       : Number(tax_price),
					weight          : chargeable_weight,
					currency,
					tax_total_price : Number(total_tax_price),
				},
			],
		},
	];

	const payload = {
		csr_data,
		mawb_number,
		payment_mode           : 'cash',
		service                : 'air_freight_local_service',
		csr_sheet_id           : id,
		sheet_index            : DEFAULT_VALUE_FOR_SHEET_INDEX,
		organization_id        : geo.uuid.freight_force_org_id,
		invoice_type_line_item : taskType === 'terminal' ? 'terminal_handling_charge' : 'gate_pass_charge',
		billing_party_detail   : {
			organization_id : cogo_entity_id,
			cin,
			entity_code,
			tan_no,
			registration_number,
			cogo_entity_id,
			business_name,
			serial_id,
			country         : {
				id: country_id,
				country_code,
				name,
				type,
			},
			address: {
				...billingAddress,
			},
		},
		collection_party_detail: {
			pincode             : collectionPincode,
			address             : collectionAddress,
			tax_number          : collectionTaxNumber,
			business_name       : collectionBusinessName,
			registration_number : collectionRegistrationNumber,
		},
	};
	return payload;
};
export default getPayload;
