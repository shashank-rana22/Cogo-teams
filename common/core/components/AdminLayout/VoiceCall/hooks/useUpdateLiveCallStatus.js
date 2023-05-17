import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const updateLocalState = ({ prev = {}, latestAddedAgentName = '', payload = {}, attendeeId = '' }) => ({
	...prev,
	attendees: [...(prev.attendees || []), {
		attendeeId,
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
			const res = await trigger({
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
			setLocalCallState((prev) => updateLocalState(
				{
					prev,
					latestAddedAgentName,
					payload,
					attendeeId: res?.data?.voice_call_attendee_id,
				},
			));
		} catch (error) {
			Toast.error(error?.response?.data?.message[0]);
		}
	};

	return {
		updateLiveCallStatus,
		updateLiveCallStatusLoading: loading,
	};
}
export default useUpdateLiveCallStatus;
