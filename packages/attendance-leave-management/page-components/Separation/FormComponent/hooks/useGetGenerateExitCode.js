import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetGenerateExitCode = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/generate_exit_code',
	}, { manual: true });

	const getExitCode = async (off_boarding_application_id) => {
		let res = {};
		try {
			res = await trigger({
				data: {
					off_boarding_application_id,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
		return res?.data;
	};

	return {
		loading,
		exitcode: data,
		getExitCode,
	};
};

export default useGetGenerateExitCode;
