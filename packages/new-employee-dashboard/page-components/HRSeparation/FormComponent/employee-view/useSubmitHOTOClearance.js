/* eslint-disable custom-eslint/uuid-check */		// TODOs
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useSubmitHOTOClearance = ({ onSuccess = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/get_application_process_details',
	}, { manual: true });

	const { handleSubmit, control, formState:{ errors } } = useForm();

	const onSubmit = async () => {
		try {
			await trigger({
				params: {
					off_boarding_application_id : '9e0f52c9-da4a-43fb-bd16-772cdc8f8bda',
					process_name                : 'hrbp_clearance',
				},
			});

			onSuccess();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, handleSubmit, errors, control, onSubmit };
};

export default useSubmitHOTOClearance;
