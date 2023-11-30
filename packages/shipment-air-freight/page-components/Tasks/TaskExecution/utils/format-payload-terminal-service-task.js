import { Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';

const DEFAULT_VALUE_FOR_TERMINAL_CHARGE = 0;
const DEFAULT_VALUE_FOR_SHEET_INDEX = 1;

const getPayload = ({
	type: taskType = 'terminal', task_id = '', values = {}, mainServicesData = {},
	entityData = {}, collectionPartyData = {}, localServiceId = '', index = 0, sheetData = {},
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

	const {
		shipment_id = '', chargeable_weight = '', airline_id = '', origin_airport_id = '',
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
					total_price     : Number(values?.[`price_${index}`]),
					other_price     : DEFAULT_VALUE_FOR_TERMINAL_CHARGE,
					discount        : DEFAULT_VALUE_FOR_TERMINAL_CHARGE,
					commission      : DEFAULT_VALUE_FOR_TERMINAL_CHARGE,
					total_tax       : Number(values?.[`tax_price_${index}`]),
					weight          : chargeable_weight,
					currency,
					tax_total_price : Number(values?.[`total_tax_price_${index}`]),
				},
			],
			receipt_reference_no: values?.[`csr_reference_number_${index}`],
		},
	];

	if (index < 0) {
		Toast.error(`Add atleast one ${taskType === 'terminal' ? 'Terminal' : 'Gatepass'} Information`);
		return null;
	}

	const payload = {
		shipment_id,
		airline_id,
		csr_data,
		organization_id      : geo.uuid.freight_force_org_id,
		service              : 'air_freight_local_service',
		sheet_index          : DEFAULT_VALUE_FOR_SHEET_INDEX,
		csr_sheet_id         : id,
		billing_party_detail : {
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
		payment_mode            : 'cash',
		collection_party_detail : {
			pincode             : collectionPincode,
			address             : collectionAddress,
			tax_number          : collectionTaxNumber,
			business_name       : collectionBusinessName,
			registration_number : collectionRegistrationNumber,
		},
		awb_number             : booking_reference_number,
		invoice_type           : 'purchase_invoice',
		origin_airport_id,
		destination_airport_id,
		mawb_number,
		invoice_type_line_item : taskType === 'terminal' ? 'thc' : 'gic',
		service_id             : localServiceId,
		pending_task_id        : task_id,
		name                   : taskType === 'terminal' ? 'Terminal Handling Charges' : 'Gatepass Charges',
		code                   : taskType === 'terminal' ? 'THC' : 'GIC',
	};

	return payload;
};
export default getPayload;
