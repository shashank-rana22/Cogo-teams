import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useHangUpCall({
	callId,
	setCallId = () => {},
	setStatus = () => {},
	setInCall = () => {},
	setShowCallModal = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/hang_up_outgoing_call',
		method : 'post',
	}, { manual: true });

	const hangUpCall = async () => {
		setStatus('hanging up');
		try {
			await trigger({
				data: {
					call_record_id: callId?.call_record_id,
				},
			});
			setCallId('');
			setStatus('');
			setInCall(false);
			setShowCallModal(false);
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
