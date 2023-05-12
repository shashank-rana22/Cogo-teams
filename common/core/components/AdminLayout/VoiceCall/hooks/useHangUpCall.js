import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useHangUpCall({
	callRecordId,
	checkToOpenFeedBack,
	hasAgentPickedCall,
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/hang_up_outgoing_call',
		method : 'post',
	}, { manual: true });

	const hangUpCall = async () => {
		try {
			await trigger({
				data: {
					call_record_id: callRecordId,
				},
			});
			checkToOpenFeedBack({ hasAgentPickedCall });
		} catch (error) {
			Toast.error(error?.response?.data?.message[0]);
		}
	};

	return {
		hangUpCall,
		hangUpLoading: loading,
	};
}
export default useHangUpCall;
