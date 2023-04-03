import { Toast } from '@cogoport/components';

const formatPayload = ({
	values = {},
	filledDetails = {},
	isAddressRegisteredUnderGst = false,
	orgResponse = {},
	source = '',
	setFilledDetails = () => {},
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
		tax_number = '',
		tax_number_document_url = '',
		address_type = '',
		is_sez,
		sez_proof = '',
		poc_details = [],
		billing_party_name = '',
		name = '',
	} = billing_address || {};

	if (poc_details.length === 0) {
		Toast.info('Please create at-least one POC before proceeding ');
		return;
	}

	const orgTradePartyDocs = [
		{
			name          : 'Trade Party Verification',
			document_type : 'verification_document',
			image_url     : verification_document,
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
			is_sez,
			sez_proof               : sez_proof || undefined,
			tax_number              : tax_number.toUpperCase() || undefined,
			tax_number_document_url : tax_number_document_url || undefined,
			address_type            : address_type || undefined,
			country_id              : country_id || undefined,
			name                    : billing_party_name || name,
		},
		organization_trade_party_documents : orgTradePartyDocs,
		trade_party_type                   : 'paying_party',
	};

	return payload;
};

export default formatPayload;
