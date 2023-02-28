import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';

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
		control: kyc_control,
		formState: { errors: Errors },
		handleSubmit: handleSubmitKyc,
		getValues,
		// setValue,
	} = useForm();

	const [{ loading: resubmitKycLoading }, trigger] = useRequest({
		url    : 'resubmit_vendor_kyc',
		method : 'post',
	}, { manual: true });

	const { documents = [], vendor_details = {} } = data;

	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));

	const { kyc_rejection_feedbacks = [] } = vendor_details;

	const newControls = (kyc_rejection_feedbacks || []).map((item) => {
		const object = VENDOR_FIELDS_MAPPING.find((getItem) => getItem.key === item) || {};
		const { value = '' } = object;
		const newcontrol = controls.find((getItem) => getItem.name === value) || {};

		if (object.value === 'country_id') {
			return { ...newcontrol, ...countryOptions };
		}

		return newcontrol;
	});

	const rejected_documents = documents.filter((item) => {
		if (item.verification_status !== 'rejected') {
			return null;
		}
		return item;
	});

	(rejected_documents || []).forEach((item) => {
		newControls.push(DOCUMENT_TYPE_CONTROL_MAPPING[item?.document_type]?.control);
	});

	const getDocuments = ({ rejected_documents: rejectedDocuments, values }) => {
		const documentsList = (rejectedDocuments || []).map((item) => ({
			id  : item.id,
			url : values[DOCUMENT_TYPE_CONTROL_MAPPING[item.document_type]?.name]?.finalUrl,
		}));

		return { documentsList };
	};

	const ResubmitKYC = async () => {
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
			Toast.success('Updated successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	};

	return {
		newControls,
		kyc_control,
		handleSubmitKyc,
		Errors,
		ResubmitKYC,
		resubmitKycLoading,
	};
};

export default useResubmitKyc;
