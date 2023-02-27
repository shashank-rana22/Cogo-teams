import { isEmpty } from '@cogoport/utils';

import contactControls from '../../../../../../OnBoardVendor/ContactDetails/utils/controls';
import paymentControls from '../../../../../../OnBoardVendor/PaymentDetails/utils/controls';
import { getControls } from '../../../../../../OnBoardVendor/VendorDetails/utils/getControls';

const useResubmitKyc = ({
	data = {},
	refetchVendorInfo = () => {},
	setshowKycModal = () => {},
}) => {
	const controls = getControls({});

	const { documents = [] } = data;

	const { vendor_details = {} } = data;
	// const { kyc_rejection_feedbacks = [] } = vendor_details;

	const VENDOR_FIELDS_MAPPING = [
		{
			key   : 'invalid_country',
			value : 'country_id',
		},
		{
			key   : 'invalid_pan_or_gst',
			value : 'registration_number',
		},
		{
			key   : 'invalid_business_name',
			value : 'business_name',
		},
		{
			key   : 'invalid_company_type',
			value : 'company_type',
		},
	];
	const kyc_rejection_feedbacks = ['invalid_pan_or_gst', 'invalid_company_type', 'invalid_country'];

	const newControls = (kyc_rejection_feedbacks || []).map((item) => {
		const object = VENDOR_FIELDS_MAPPING.find((getItem) => getItem.key === item);
		const { value } = object;
		const newcontrol = controls.find((getItem) => getItem.name === value);

		return newcontrol;
	});

	const rejected_documents = documents.filter((item) => {
		if (item.verification_status === 'rejected') {
			return item;
		}
		return null;
	});

	const registrationControl = controls.find((item) => item.name === 'registration_proof_url');

	const contactControl = contactControls.find((item) => item.name === 'contact_proof_url');

	const paymentControl = paymentControls.find((item) => item.name === 'bank_document_url');

	rejected_documents.forEach((item) => {
		if (item.document_type === 'registration_proof') {
			newControls.push(registrationControl);
		} else if (item.document_type === 'poc_proof') {
			newControls.push(contactControl);
		} else {
			newControls.push(paymentControl);
		}
	});
	console.log('x', newControls);

	const Data = {};

	return {
		Data,
		newControls,
	};
};

export default useResubmitKyc;
