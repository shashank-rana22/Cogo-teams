import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateCogooneTimeline = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_cogoone_timeline',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const createCogooneTimeline = async ({ payload }) => {
		try {
			trigger({ data: payload });
		} catch (e) {
			console.error(e);
		}
	};
	return {
		createCogooneTimeline,
		loading,
	};
};
export default useCreateCogooneTimeline;
