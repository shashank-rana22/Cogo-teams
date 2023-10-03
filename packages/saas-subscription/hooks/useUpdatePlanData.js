import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const usePlanData = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_saas_plan',
	}, { manual: true });

	const submitHandler = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
		} catch (e) {
			Toast.error(getApiErrorString(e.response?.data));
		}
	};

	return { loading, submitHandler };
};

export default usePlanData;
