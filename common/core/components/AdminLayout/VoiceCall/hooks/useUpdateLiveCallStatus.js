import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const updateLocalState = (p = {}, latestAddedAgentName = '', agent_id = '') => ({
	...p,
	attendees: [...(p.attendees || []), {
		agentName : latestAddedAgentName,
		id        : agent_id,
	}],
});

function useUpdateLiveCallStatus({
	callId,
	latestAddedAgentName,
	setLocalCallState,
	checkToOpenFeedBack,
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_live_call',
		method : 'post',
	}, { manual: true });

	const updateLiveCallStatus = async (payload = {}, callbackFunc = () => {}) => {
		try {
			const { live_call_action_type = [], agent_id = '' } = payload || {};
			await trigger({
				data: {
					call_id               : callId,
					agent_id,
					live_call_action_type : live_call_action_type?.[0],
				},
			});
			if (live_call_action_type?.[0] === 'transfer') {
				Toast.success('call transferred sucessfully');
				checkToOpenFeedBack({ hasAgentPickedCall: false });
				return;
			}
			callbackFunc();
			setLocalCallState((p) => updateLocalState(p, latestAddedAgentName, agent_id));
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	return {
		updateLiveCallStatus,
		updateLiveCallStatusLoading: loading,
	};
}
export default useUpdateLiveCallStatus;
