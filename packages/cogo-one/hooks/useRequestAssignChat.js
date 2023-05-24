import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { useRequest } from '@cogoport/request';

const useRequestAssignChat = () => {
	const { uuid:{ sagar_bankar_user_id = '' } } = GLOBAL_CONSTANTS;
	const [{ loading }, trigger] = useRequest({
		url    : '/request_assign_chat',
		method : 'post',
	}, { manual: true });

	const requestForAssignChat = async (payload = {}) => {
		try {
			await trigger({
				data: {
					agent_id: sagar_bankar_user_id,
					...payload,
				},
			});
			Toast.success('Requested Sucessfully');
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data));
		}
	};

	return {
		requestForAssignChat,
		requestAssignLoading: loading,
	};
};
export default useRequestAssignChat;
