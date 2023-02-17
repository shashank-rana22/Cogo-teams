import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState } from 'react';
// import { useSelector } from '@cogoport/store';

function useOutgoingCall() {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_outgoing_call',
		method : 'post',
	}, { manual: true });

	const [callId, setCallId] = useState('');
	const [callStatus, setCallStatus] = useState('');
	const dispatch = useDispatch();
	const profileData = useSelector(({ profile }) => profile);

	const makeCallApi = async () => {
		try {
			const res = await trigger({
				data: {
					agent_id        : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
					organization_id : 'bbde20db-d8b8-4be7-8307-367666847041',
					user_id         : 'cba50126-efbc-4caa-8383-b616dec9d44b',
				},
			});
			setCallId(res?.data);
			setCallStatus(res?.status);
			dispatch(
				setProfileState({
					...profileData,
					voice_call: {
						...profileData?.voice_call,
						call_id: res.data?.call_record_id,
					},
				}),
			);
			if (res.data === 'Call Not Connected' || !res.data) {
				Toast.error(res?.data);
				dispatch(
					setProfileState({
						...profileData,
						voice_call: {
							...profileData?.voice_call,
							showCallModal     : false,
							inCall            : false,
							endCall           : false,
							call_id           : res.data?.call_record_id,
							showFeedbackModal : false,
						},
					}),
				);
			}
		} catch (error) {
			Toast.error(error?.response?.data?.message[0]);
			dispatch(
				setProfileState({
					...profileData,
					voice_call: {
						...profileData?.voice_call,
						showCallModal     : false,
						inCall            : false,
						endCall           : false,
						showFeedbackModal : false,
					},
				}),
			);
		}
	};

	return {
		makeCallApi,
		callLoading: loading,
		callId,
		callStatus,
		setCallId,
		setCallStatus,
	};
}
export default useOutgoingCall;
