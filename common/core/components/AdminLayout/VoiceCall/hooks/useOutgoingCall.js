import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useOutgoingCall({
	voice_call_recipient_data = {},
	checkToOpenFeedBack,
	localStateReducer,
	startApiCallInterval,
	fetchCallStatus,
}) {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_outgoing_call',
			method : 'post',
		},
		{ manual: true },
	);

	const {
		isUnkownUser = true,
		orgId = '',
		userId = '',
		mobile_number = '',
		mobile_country_code = '',
		loggedInAgentId = '',
	} = voice_call_recipient_data || {};

	const makeCallApi = useCallback(async () => {
		let payload = {};
		if (isUnkownUser) {
			payload = {
				destination_number: {
					mobile_country_code,
					mobile_number,
				},
			};
		} else {
			payload = {
				organization_id : orgId,
				user_id         : userId,
			};
		}
		try {
			const res = await trigger({
				data: { ...payload, source: 'cogo_one', agent_id: loggedInAgentId },
			});
			const callRecordId = res?.data?.call_record_id;
			localStateReducer({ callRecordId });
			startApiCallInterval(() => fetchCallStatus(callRecordId));
		} catch (error) {
			Toast.error(error?.response?.data?.message[0]);
			checkToOpenFeedBack({ hasAgentPickedCall: false });
		}
	}, [
		isUnkownUser,
		mobile_country_code,
		mobile_number,
		orgId,
		trigger,
		userId,
		loggedInAgentId,
		checkToOpenFeedBack,
		localStateReducer,
		fetchCallStatus,
		startApiCallInterval,
	]);

	return {
		makeCallApi,
		callLoading: loading,
	};
}
export default useOutgoingCall;
