import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

const fieldsInPaymentDetails = () => {
	const FIELDS_TO_SHOW = {
		account_holder_name : 'Account Holder’s Name',
		account_number      : 'Account No.',
		account_type        : 'Account Type',
		ifsc_code           : 'IFSC Code',
		swift_code          : 'SWIFT Code',
		bank_name           : 'Bank Name',
		branch_name         : 'Branch Name',
		bank_document_url   : 'Cancelled Cheque/Passbook',
		address             : 'Billing Address',
		tax_number          : `${geo.others.registration_number.label} Number`,
		tax_document_url    : `${geo.others.registration_number.label} Proof`,
	};
	return FIELDS_TO_SHOW;
};

export default fieldsInPaymentDetails;
