import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';

import contactControls from '../../../../../../OnBoardVendor/ContactDetails/utils/controls';
import paymentControls from '../../../../../../OnBoardVendor/PaymentDetails/utils/controls';
import { getControls } from '../../../../../../OnBoardVendor/VendorDetails/utils/getControls';

const useResubmitKyc = ({
	data = {},
	refetchVendorInfo = () => {},
	setshowKycModal = () => {},
}) => {
	const controls = getControls({});

	const {
		control: Control,
		formState: { errors: Errors },
		handleSubmit: handleSubmitKyc,
		getValues,
		setValue,
	} = useForm();

	const [{ loading }, trigger] = useRequest({
		url    : 'update_vendor',
		method : 'post',
	}, { manual: true });

	const { documents = [], vendor_details = {} } = data;

	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));

	const { kyc_rejection_feedbacks = [] } = vendor_details;

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

	const newControls = (kyc_rejection_feedbacks || []).map((item) => {
		const object = VENDOR_FIELDS_MAPPING.find((getItem) => getItem.key === item);
		const { value } = object;
		const newcontrol = controls.find((getItem) => getItem.name === value);

		if (object.value === 'country_id') {
			return { ...newcontrol, ...countryOptions };
		}

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

	const document_ids = rejected_documents.map((item) => item.id);

	const getDocments = ({ rejected_documents: RejectedDocuments, values }) => {
		const Documents = RejectedDocuments.map((item) => {
			if (item.document_type === 'registration_proof') {
				return { id: item.id, url: values.registration_proof_url?.finalUrl };
			}
			if (item.document_type === 'poc_proof') {
				return { id: item.id, url: values.contact_proof_url?.finalUrl };
			}
			return { id: item.id, url: values.bank_document_url?.finalUrl };
		});

		return Documents;
	};

	const ResubmitKYC = async () => {
		const values = getValues();

		const filtered_documents = getDocments({ rejected_documents, values });
		const payload = {
			id                  : vendor_details?.id,
			documents           : filtered_documents,
			business_name       : values.business_name || undefined,
			country_id          : values.country_id || undefined,
			company_type        : values.company_type || undefined,
			registration_number : values.registration_number?.registrationNumber || undefined,
			kyc_status          : 'pending_verification',
		};

		try {
			await trigger({
				data: payload,
			});
			setshowKycModal(false);
			refetchVendorInfo();
			Toast.success('Updated successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	};

	const Data = {};

	return {
		newControls,
		Control,
		handleSubmitKyc,
		Errors,
		ResubmitKYC,
	};
};

export default useResubmitKyc;
