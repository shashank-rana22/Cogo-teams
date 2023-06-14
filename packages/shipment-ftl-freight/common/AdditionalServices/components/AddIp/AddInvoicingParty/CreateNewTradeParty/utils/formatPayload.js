import { Toast } from '@cogoport/components';

const formatPayload = ({
	values = {},
	filledDetails = {},
	isAddressRegisteredUnderGst = false,
	orgResponse = {},
	source = '',
	setFilledDetails = () => {},
	gstNumber,
}) => {
	let newFilledDetails = { ...filledDetails };

	newFilledDetails = {
		...newFilledDetails,
		billing_address: values,
	};

	setFilledDetails(newFilledDetails);

	const {
		billing_address = {},
		business_name = '',
		company_type = '',
		registration_number = '',
		verification_document = {},
		country_id = '',
	} = newFilledDetails;

	const {
		tax_number_document_url = '',
		is_sez,
		poc_details = [],
		billing_party_name = '',
		name = '',
		address = '',
		pincode = '',
	} = billing_address || {};

	if (poc_details.length === 0) {
		Toast.info('Please create at-least one POC before proceeding ');
		return null;
	}

	const orgTradePartyDocs = [
		{
			name          : 'Trade Party Verification',
			document_type : 'verification_document',
			image_url     : verification_document?.finalUrl,
			data          : {},
			source,
		},
	];

	const payload = {
		organization_id     : orgResponse?.id || undefined,
		business_name,
		company_type,
		registration_number : registration_number.toUpperCase(),
		country_id,
		is_tax_applicable   : !isAddressRegisteredUnderGst,
		poc_details,
		address_detail      : {
			is_sez                  : is_sez || false,
			tax_number              : gstNumber.toUpperCase() || undefined,
			tax_number_document_url : tax_number_document_url?.finalUrl || undefined,
			address,
			name                    : billing_party_name || name,
			pincode,
			gst_list                : gstNumber.toUpperCase(),
		},
		organization_trade_party_documents : orgTradePartyDocs,
		trade_party_type                   : 'paying_party',
	};

	return payload;
};

export default formatPayload;
