import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { getConstantsByCountryCode } from '@cogoport/globalization/constants/geo';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { isEmpty, merge } from '@cogoport/utils';

import { getControls } from '../../../../../../OnBoardVendor/VendorDetails/utils/getControls';
import DOCUMENT_TYPE_CONTROL_MAPPING from '../utils/documentTypeControlMapping';
import VENDOR_FIELDS_MAPPING from '../utils/vendorFieldMapping';

const useResubmitKyc = ({
	data = {},
	refetchVendorInfo = () => {},
	setshowKycModal = () => {},
}) => {
	const controls = getControls({});

	const {
		control: controls_kyc,
		formState: { errors: errors_kyc },
		handleSubmit: handleSubmitKyc,
		getValues,
		watch,
	} = useForm();

	const formValueCountryId = watch('country_id');

	const [{ loading }, trigger] = useRequest({
		url    : 'resubmit_vendor_kyc',
		method : 'post',
	}, { manual: true });

	const { push } = useRouter();

	const { documents = [], vendor_details = {} } = data;

	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));

	const { kyc_rejection_feedbacks = [], country_id: vendorCountryId } = vendor_details;

	let newControls = (kyc_rejection_feedbacks || []).map((item) => {
		const object = VENDOR_FIELDS_MAPPING.find((getItem) => getItem.key === item) || {};

		if (isEmpty(object)) {
			return null;
		}

		const { value = '' } = object;

		const newcontrol = controls.find((getItem) => getItem.name === value);

		if (object.value === 'country_id') {
			return { ...newcontrol, ...countryOptions };
		}

		if (object.value === 'company_type') {
			const options = getConstantsByCountryCode({ country_id: formValueCountryId || vendorCountryId })
				.options.registration_types;

			return { ...newcontrol, options };
		}

		return newcontrol;
	});

	newControls = newControls.filter((item) => item !== null);

	const rejected_documents = documents.filter((item) => {
		if (item.verification_status !== 'rejected') {
			return null;
		}
		return item;
	});

	(rejected_documents || []).forEach((item) => {
		const documentControl = {
			...DOCUMENT_TYPE_CONTROL_MAPPING[item?.document_type]?.control,
			rules: { required: 'Required' },
		};

		newControls.push(documentControl);
	});

	const getDocuments = ({ rejected_documents: rejectedDocuments, values }) => {
		const documentsList = (rejectedDocuments || []).map((item) => ({
			id  : item.id,
			url : values[DOCUMENT_TYPE_CONTROL_MAPPING[item.document_type]?.name]?.finalUrl,
		}));

		return { documentsList };
	};

	const resubmitKYC = async () => {
		const values = getValues();

		const { documentsList } = getDocuments({ rejected_documents, values });

		const {
			business_name = '',
			country_id = '',
			company_type = '',
			registration_number,
		} = values || {};

		const payload = {
			vendor_id           : vendor_details?.id,
			documents           : documentsList,
			business_name       : business_name || undefined,
			country_id          : country_id || undefined,
			company_type        : company_type || undefined,
			registration_number : registration_number?.registrationNumber || undefined,
			kyc_status          : 'pending_verification',
		};

		try {
			await trigger({
				data: payload,
			});

			setshowKycModal(false);

			refetchVendorInfo();

			Toast.success('KYC re-submitted successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response.data));
		}
	};

	const handleCompleteKyc = () => {
		push('/onboard-vendor/[vendor_id]', `/onboard-vendor/${vendor_details.id}`);
	};

	return {
		newControls,
		controls_kyc,
		loading,
		handleSubmitKyc,
		errors_kyc,
		resubmitKYC,
		handleCompleteKyc,
	};
};

export default useResubmitKyc;
