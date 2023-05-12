import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const updateLocalState = (p = {}, latestAddedAgentName = '', payload = {}) => ({
	...p,
	attendees: [...(p.attendees || []), {
		agentName: latestAddedAgentName,
		...payload,
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
			await trigger({
				data: {
					call_id: callId,
					...payload,
				},
			});
			if (payload?.live_call_action_type === 'transfer') {
				Toast.success('call transferred sucessfully');
				checkToOpenFeedBack({ hasAgentPickedCall: false });
				return;
			}
			callbackFunc();
			setLocalCallState((p) => updateLocalState(p, latestAddedAgentName, payload));
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
