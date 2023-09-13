import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateCogooneShift({ getListShift = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_bulk_cogoone_shift',
		method : 'post',
	}, { manual: true });

	const updateTeamsShift = async (payload) => {
		try {
			await trigger({ data: payload });
			getListShift();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};
	return {
		updateTeamsShift,
		loading,
	};
}
export default useUpdateCogooneShift;
