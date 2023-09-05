import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useRequestAssignChat = () => {
	const { loggedInAgentType = '' } = useSelector(({ profile }) => ({
		loggedInAgentType: profile?.cogoone_agent_type,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/request_assign_chat',
		method : 'post',
	}, { manual: true });

	const requestForAssignChat = async ({ payload = {} }) => {
		try {
			await trigger({
				data: {
					agent_id              : GLOBAL_CONSTANTS.uuid.sagar_bankar_user_id,
					requesting_agent_type : loggedInAgentType,
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
