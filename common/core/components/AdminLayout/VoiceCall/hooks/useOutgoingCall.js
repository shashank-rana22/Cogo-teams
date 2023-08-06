import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getPayload = ({
	isUnkownUser,
	mobile_country_code,
	mobile_number,
	orgId,
	userId,
	loggedInAgentId,
}) => {
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

	return { ...payload, source: 'cogo_one', agent_id: loggedInAgentId };
};

const setCallStateData = ({
	mobile_number,
	orgId,
	userId,
	userName,
	setCallState,
}) => {
	const receiverUserDetails = {
		mobile_number,
		user_id         : userId,
		lead_user_id    : '',
		userName,
		organization_id : orgId,
	};

	setCallState((p) => ({ ...p, receiverUserDetails, showCallModalType: 'fullCallModal', isSelfIntiated: true }));
};

function useOutgoingCall({
	voiceCallData = {},
	setCallState = () => {},
	unmountVoiceCall = () => {},
	loggedInAgentId = '',
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
		userName = '',
	} = voiceCallData || {};

	const makeCallApi = useCallback(() => {
		try {
			setCallStateData({
				mobile_number,
				orgId,
				userId,
				userName,
				setCallState,
			});

			trigger({
				data: getPayload({
					isUnkownUser,
					mobile_country_code,
					mobile_number,
					orgId,
					userId,
					loggedInAgentId,
				}),
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message[GLOBAL_CONSTANTS.zeroth_index] || 'something went wrong');
			unmountVoiceCall();
		}
	}, [isUnkownUser, loggedInAgentId, mobile_country_code,
		mobile_number, orgId, setCallState, trigger, unmountVoiceCall, userId, userName]);

	return {
		makeCallApi,
		callLoading: loading,
	};
}
export default useOutgoingCall;
