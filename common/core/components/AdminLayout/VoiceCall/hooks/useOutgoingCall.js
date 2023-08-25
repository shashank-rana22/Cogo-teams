import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getPayload = ({
	isUnkownUser = false,
	mobile_country_code = '',
	mobile_number = '',
	orgId = '',
	userId = '',
	loggedInAgentId = '',
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
	mobile_number = '',
	orgId = '',
	userId = '',
	userName = '',
	setCallState = () => {},
	lead_user_id = '',
	lead_organization_id = '',
}) => {
	const receiverUserDetails = {
		mobile_number,
		user_id         : userId,
		userName,
		organization_id : orgId,
		lead_user_id,
		lead_organization_id,
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
		lead_user_id = '',
		lead_organization_id = '',
	} = voiceCallData || {};

	const makeCallApi = useCallback(async () => {
		try {
			setCallStateData({
				mobile_number,
				orgId,
				userId,
				userName,
				setCallState,
				lead_user_id,
				lead_organization_id,
			});

			await trigger({
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
			Toast.error(error?.response?.data?.message?.[GLOBAL_CONSTANTS.zeroth_index] || 'Something Went Wrong');
			unmountVoiceCall();
		}
	}, [
		isUnkownUser, lead_organization_id, lead_user_id,
		loggedInAgentId, mobile_country_code, mobile_number, orgId,
		setCallState, trigger, unmountVoiceCall, userId, userName,
	]);

	return {
		makeCallApi,
		callLoading: loading,
	};
}
export default useOutgoingCall;
