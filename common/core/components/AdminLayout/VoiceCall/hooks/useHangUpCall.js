import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

function useHangUpCall({
	callRecordId,
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/hang_up_outgoing_call',
		method : 'post',
	}, { manual: true });

	const hangUpCall = () => {
		try {
			trigger({
				data: {
					call_record_id: callRecordId,
				},
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message[GLOBAL_CONSTANTS.zeroth_index]);
		}
	};

	return {
		hangUpCall,
		hangUpLoading: loading,
	};
}
export default useHangUpCall;
