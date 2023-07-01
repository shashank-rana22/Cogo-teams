import contactControls from '../../../../../../OnBoardVendor/ContactDetails/utils/controls';
import getPaymentControls from '../../../../../../OnBoardVendor/PaymentDetails/utils/controls';
import { getControls } from '../../../../../../OnBoardVendor/VendorDetails/utils/getControls';

const controls = getControls({});

const registrationControl = controls.find((item) => item.name === 'registration_proof_url');

const contactControl = contactControls.find((item) => item.name === 'contact_proof_url');

const getDocumentControlsTypeMapping = ({ country_id }) => {
	const paymentControls = getPaymentControls({ country_id });

	const taxDocumentControl = paymentControls.find((item) => item.name === 'tax_document_url');

	return {
		registration_proof: {
			name    : 'registration_proof_url',
			control : registrationControl,
		},
		poc_proof: {
			name    : 'contact_proof_url',
			control : contactControl,
		},
		tax_document_proof: {
			name    : 'tax_document_url',
			control : taxDocumentControl,
		},
	};
};

export default getDocumentControlsTypeMapping;
