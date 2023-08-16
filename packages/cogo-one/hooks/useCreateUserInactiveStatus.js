import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { updateUserLastActivity } from '../helpers/configurationHelpers';

function useCreateUserInactiveStatus({
	fetchworkPrefernce = () => {},
	setOpenModal = () => {},
	agentTimeline = () => {},
	firestore = {},
	userId = '',
	status = '',
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const updateStatus = status === 'active' ? 'break' : 'active';

	const updateUserStatus = async (data) => {
		try {
			await trigger({
				data: {
					...data,
				},
			});
			setOpenModal(false);
			updateUserLastActivity({ firestore, agent_id: userId, updated_status: updateStatus });
			Toast.success('succesfully updated your status');
			agentTimeline();
			fetchworkPrefernce();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updateUserStatus,
	};
}
export default useCreateUserInactiveStatus;
