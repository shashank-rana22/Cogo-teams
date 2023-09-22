import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { setCookie } from '@cogoport/utils';

const NEGATIVE_INDEX = -1;
const SESSION_TIMEOUT = 3000;

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
				'Separation Completed, Please Relogin',
			);

			setTimeout(() => {
				setCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME, 'expired', NEGATIVE_INDEX);
				setCookie(process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN_NAME, 'expired', NEGATIVE_INDEX);
				window.location.href = '/v2/login';
			}, SESSION_TIMEOUT);
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, handleSubmit, errors, control, onSubmit };
};

export default useSubmitResignationProgress;
