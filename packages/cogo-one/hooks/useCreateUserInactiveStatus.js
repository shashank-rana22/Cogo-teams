import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { updateUserLastActivity } from '../helpers/configurationHelpers';

function useCreateUserInactiveStatus({
	fetchworkPrefernce = () => {},
	setOpenModal = () => {},
	agentTimeline = () => {},
	firestore = {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const updateUserStatus = async (data = {}) => {
		try {
			const { userId, status } = data || {};

			await trigger({
				data: {
					status,
					agent_id: userId,
				},
			});

			setOpenModal(false);
			updateUserLastActivity({ firestore, agent_id: userId, updated_status: data?.status });
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
