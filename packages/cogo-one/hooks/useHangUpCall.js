import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useHangUpCall({
	callId,
	setCallId = () => {},
	setStatus = () => {},
	setInCall = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_outgoing_call',
		method : 'post',
	}, { manual: true });

	const hangUpCall = async () => {
		setStatus('hanging up');
		try {
			await trigger({
				data: {
					call_record_id: callId,
				},
			});
			setCallId('');
			setStatus('');
			setInCall(false);
		} catch (error) {
			Toast.error(error);
		}
	};

	return {
		hangUpCall,
		hangUpLoading: loading,
	};
}
export default useHangUpCall;
