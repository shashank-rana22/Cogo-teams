import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetGenerateExitCode = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/generate_exit_code',
	}, { manual: true });

	const getExitCode = async ({ off_boarding_application_id }) => {
		try {
			await trigger({
				data: {
					off_boarding_application_id,
				},

			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		getExitCode,
	};
};

export default useGetGenerateExitCode;
