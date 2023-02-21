import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState } from 'react';

function useOutgoingStatusCall({ callId }) {
	const { call_record_id = '' } = callId || {};
	const [{ loading }, trigger] = useRequest({
		url    : '/check_outgoing_call_status',
		method : 'post',
	}, { manual: true });

	const dispatch = useDispatch();
	const profileData = useSelector(({ profile }) => profile);
	const [status, setStatus] = useState('');

	const callStatusApi = async () => {
		try {
			const res = await trigger({
				data: {
					call_record_id,
				},
			});
			setStatus(res.data);
			if (res.data === 'completed') {
				dispatch(
					setProfileState({
						...profileData,
						voice_call: {
							...profileData?.voice_call,
							endCall           : true,
							inCall            : false,
							showCallModal     : false,
							minimizeModal     : false,
							showFeedbackModal : false,
							endTime           : new Date(),
						},
					}),
				);
			}
		} catch (error) {
			Toast.error(error);
		}
	};
	return {
		statusLoading: loading,
		status,
		callStatusApi,
		setStatus,
	};
}
export default useOutgoingStatusCall;
