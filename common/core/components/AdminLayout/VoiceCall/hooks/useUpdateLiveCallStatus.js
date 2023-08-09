import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

function useUpdateLiveCallStatus({
	callId,
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_live_call',
		method : 'post',
	}, { manual: true });

	const updateLiveCallStatus = async (payload = {}, callbackFunc = () => {}) => {
		try {
			const { live_call_action_type = '', agent_id = '' } = payload || {};
			await trigger({
				data: {
					call_id: callId,
					live_call_action_type,
					agent_id,
				},
			});

			if (live_call_action_type === 'transfer') {
				Toast.success('call transferred sucessfully');
				return;
			}

			callbackFunc();
		} catch (error) {
			Toast.error(error?.response?.data?.message?.[GLOBAL_CONSTANTS.zeroth_index]);
		}
	};

	return {
		updateLiveCallStatus,
		updateLiveCallStatusLoading: loading,
	};
}
export default useUpdateLiveCallStatus;
