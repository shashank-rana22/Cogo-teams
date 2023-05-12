import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import { CALL_END_STATUS } from '../constant';

const updateLocalState = (p = {}, attendees = [], call_id = '', live_call_status = '') => {
	const prevAttendes = p.attendees || [];
	const lastAttendee = prevAttendes.pop() || {};
	const updateLastAttendeee = attendees?.find(({ agent_id }) => agent_id === lastAttendee?.agent_id);

	if (updateLastAttendeee) {
		prevAttendes.push({
			...lastAttendee,
			status: updateLastAttendeee?.call_status,
		});
	}

	return {
		...p,
		attendees          : prevAttendes,
		callId             : call_id,
		status             : live_call_status,
		hasAgentPickedCall : true,
	};
};

function useOutgoingStatusCall({
	setLocalCallState,
	checkToOpenFeedBack,
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/check_outgoing_call_status',
		method : 'post',
	}, { manual: true });

	const fetchCallStatus = useCallback(async (callRecordId = '') => {
		try {
			const res = await trigger({
				data: {
					call_record_id: callRecordId,
				},
			});
			const { call_status = '', live_call_status = '', call_id = '', attendees = [] } = res.data || {};
			if (call_status) {
				Toast.default(CALL_END_STATUS?.[call_status]);
			}
			if (live_call_status === 'in_progress') {
				setLocalCallState((p) => updateLocalState(p, attendees, call_id, live_call_status));
			}
			if (live_call_status === 'completed') {
				checkToOpenFeedBack({ hasAgentPickedCall: call_status !== 'not_connected' });
			}
		} catch (error) {
			// console.log("error:", error)
		}
	}, [checkToOpenFeedBack, setLocalCallState, trigger]);
	return {
		fetchCallStatus, loading,
	};
}
export default useOutgoingStatusCall;
