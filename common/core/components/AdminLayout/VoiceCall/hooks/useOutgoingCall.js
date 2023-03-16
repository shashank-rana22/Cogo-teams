import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState } from 'react';

function useOutgoingCall() {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_outgoing_call',
		method : 'post',
	}, { manual: true });

	const [callId, setCallId] = useState('');
	const [callStatus, setCallStatus] = useState('');
	const dispatch = useDispatch();
	const profileData = useSelector(({ profile }) => profile);
	const voiceCall = profileData?.voice_call;

	const makeCallApi = async () => {
		const {
			orgId,
			userId,
			mobile_country_code,
			agentId,
			emptyState,
			mobile_number,
			dialCall,
		} = voiceCall || {};
		let payload = {};
		if (emptyState || dialCall) {
			payload = {
				destination_number: {
					mobile_country_code,
					mobile_number,
				},
				agent_id : agentId,
				source   : 'cogo_one',
			};
		} else {
			payload = {
				agent_id        : agentId,
				organization_id : orgId,
				user_id         : userId,
				source          : 'cogo_one',
			};
		}
		try {
			const res = await trigger({
				data: payload,
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
							minimizeModal     : false,
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
						minimizeModal     : false,
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
