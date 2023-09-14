/* eslint-disable custom-eslint/uuid-check */		// TODOs
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
		console.log('values resignation api :: ', values);
		try {
			await trigger({
				data: {
					application_id : '9e0f52c9-da4a-43fb-bd16-772cdc8f8bda',
					exit_code      : values,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, handleSubmit, errors, control, onSubmit };
};

export default useSubmitResignationProgress;
