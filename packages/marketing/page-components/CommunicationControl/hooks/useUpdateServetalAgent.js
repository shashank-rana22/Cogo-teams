import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateServetalAgent = ({
	listServetalAgent,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_servetel_agent',
		method : 'POST',
	}, { manual: true });

	const updateAgent = async ({ payload = {}, action = '' }) => {
		try {
			await trigger({
				data: {
					...payload,
					action_type: action,
				},
			});
			listServetalAgent();
			if (action === 'delete_agent') {
				Toast.success('Agent Deleted Successfully');
			} else {
				Toast.success('Updated Successfully');
			}
		} catch (error) {
			toastApiError(error);
		}
	};
	return {
		updateAgent,
		updateLoading: loading,
	};
};
export default useUpdateServetalAgent;
