import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

function useOutgoingStatusCall({ callId }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/check_outgoing_call_status',
		method : 'post',
	}, { manual: true });
	const [status, setStatus] = useState('');

	const callStatusApi = async () => {
		try {
			const res = await trigger({
				data: {
					call_record_id: callId,
				},
			});
			setStatus(res.data);
			if (res.data === 'completed') {
				setStatus('');
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
