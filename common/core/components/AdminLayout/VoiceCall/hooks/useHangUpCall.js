import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { setDoc, doc } from 'firebase/firestore';

const updateRoom = ({ agentId = '', firestore = {} }) => {
	const docRef = doc(firestore, `/users/${agentId}`);

	setDoc(
		docRef,
		{
			call_details            : {},
			last_activity_timestamp : Date.now(),
			last_activity           : 'call_end',
			feedback_form_status    : 'pending',
		},
		{ merge: true },
	);
};

function useHangUpCall({
	callRecordId = '',
	firestore = {},
	loggedInAgentId = '',
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
			updateRoom({ agentId: loggedInAgentId, firestore });
		} catch (error) {
			Toast.error(error?.response?.data?.message?.[GLOBAL_CONSTANTS.zeroth_index]);
		}
	};

	return {
		hangUpCall,
		hangUpLoading: loading,
	};
}
export default useHangUpCall;
