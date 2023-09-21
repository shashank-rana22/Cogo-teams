const SERVICE_TYPE = 'fcl_freight_local';

const getAutoUpsellPayload = ({ task = {}, values = {}, countryId = '', consigneeId = '' }) => {
	const {
		name = '',
		business_name = '',
		pincode = '',
		tax_number = '',
		address = '',
		tax_number_document_url = '',
		mobile_number = {},
		email = '',
	} = values || {};

	const { shipment_id = '', task_field_id = '' } = task || {};

	const payload = {
		shipment_id,
		address,
		pincode,
		tax_number,
		name                    : business_name,
		tax_number_document_url : tax_number_document_url?.finalUrl,
		service_type            : SERVICE_TYPE,
		trade_partner_id        : task_field_id,
		country_id              : countryId,
		poc_details             : [{
			name,
			email,
			mobile_number       : mobile_number?.number,
			mobile_country_code : mobile_number?.country_code,
		}],
		organization_id: consigneeId || undefined,
	};

	return payload;
};

export default getAutoUpsellPayload;
