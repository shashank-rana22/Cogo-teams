import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useSubmitResignationProgress = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : 'complete_separation',
	}, { manual: true });

	const { handleSubmit, control, formState:{ errors } } = useForm();

	const onSubmit = async (values = {}) => {
		try {
			await trigger({
				data: {
					application_id : values.application_id,
					exit_code      : values.otpValue,
				},
			});
			Toast.success(
				'Completed Separation',
			);
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, handleSubmit, errors, control, onSubmit };
};

export default useSubmitResignationProgress;
