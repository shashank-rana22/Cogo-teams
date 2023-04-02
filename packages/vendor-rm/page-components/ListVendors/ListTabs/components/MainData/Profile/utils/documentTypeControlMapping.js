import contactControls from '../../../../../../OnBoardVendor/ContactDetails/utils/controls';
import paymentControls from '../../../../../../OnBoardVendor/PaymentDetails/utils/controls';
import { getControls } from '../../../../../../OnBoardVendor/VendorDetails/utils/getControls';

const controls = getControls({});

const registrationControl = controls.find((item) => item.name === 'registration_proof_url');

const contactControl = contactControls.find((item) => item.name === 'contact_proof_url');

const taxDocumentControl = paymentControls.find((item) => item.name === 'tax_document_url');

const DOCUMENT_TYPE_CONTROL_MAPPING = {
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

export default DOCUMENT_TYPE_CONTROL_MAPPING;
