import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

function useHangUpCall({
	callId,
	setCallId = () => {},
	setStatus = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/hang_up_outgoing_call',
		method : 'post',
	}, { manual: true });

	const dispatch = useDispatch();
	const profileData = useSelector(({ profile }) => profile);

	const hangUpCall = async () => {
		setStatus('hanging up');
		try {
			const res = await trigger({
				data: {
					call_record_id: callId?.call_record_id,
				},
			});
			setCallId('');
			if (res.data?.call_record_id) {
				dispatch(
					setProfileState({
						...profileData,
						voice_call: {
							...profileData.voice_call,
							endCall           : false,
							inCall            : false,
							showCallModal     : false,
							minimizeModal     : false,
							showFeedbackModal : true,
						},
					}),
				);
			}
			setStatus('');
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
