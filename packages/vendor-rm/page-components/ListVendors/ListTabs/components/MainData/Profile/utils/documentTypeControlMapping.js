import contactControls from '../../../../../../OnBoardVendor/ContactDetails/utils/controls';
import { getControls } from '../../../../../../OnBoardVendor/VendorDetails/utils/getControls';

const controls = getControls({});

const registrationControl = controls.find((item) => item.name === 'registration_proof_url');

const contactControl = contactControls.find((item) => item.name === 'contact_proof_url');

const DOCUMENT_TYPE_CONTROL_MAPPING = {
	registration_proof: {
		name    : 'registration_proof_url',
		control : registrationControl,
	},
	poc_proof: {
		name    : 'contact_proof_url',
		control : contactControl,
	},
};

export default DOCUMENT_TYPE_CONTROL_MAPPING;
