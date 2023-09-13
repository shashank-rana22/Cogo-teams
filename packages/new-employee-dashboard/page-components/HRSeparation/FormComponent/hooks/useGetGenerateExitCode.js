import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useGetGenerateExitCode = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/generate_exit_code',
	}, { manual: true });

	const getExitCode = async () => {
		let res = {};
		try {
			res = await trigger({
				data: {
					off_boarding_application_id: '9e0f52c9-da4a-43fb-bd16-772cdc8f8bda',
				},
			});
			if (res?.data) {
				return res.data;
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
		return res;
	};

	return {
		loading,
		data,
		getExitCode,
	};
};

export default useGetGenerateExitCode;
