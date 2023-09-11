/* eslint-disable custom-eslint/uuid-check */		// TODOs
import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useSubmitResignationProgress = ({ onSuccess = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/generate_exit_code',
	}, { manual: true });

	const { handleSubmit, control, formState:{ errors } } = useForm();

	const onSubmit = async (values = {}) => {
		console.log('values', values);
		try {
			await trigger({
				data: {
					off_boarding_application_id : 'f191ea65-dc5b-4d9d-ab8a-4c4833a87058',
					process_name                : 'complete_separation',
				},
			});

			onSuccess();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, handleSubmit, errors, control, onSubmit };
};

export default useSubmitResignationProgress;
