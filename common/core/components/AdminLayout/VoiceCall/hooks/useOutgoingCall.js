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
	source = 'cogo_one',
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

	return { ...payload, source, agent_id: loggedInAgentId };
};

const setCallStateData = ({
	mobile_number = '',
	orgId = '',
	userId = '',
	userName = '',
	setCallState = () => {},
	selfOrganizationId = {},
	source = '',
}) => {
	const receiverUserDetails = {
		mobile_number,
		user_id         : userId,
		lead_user_id    : '',
		userName,
		organization_id : orgId,
	};

	setCallState((p) => ({
		...p,
		selfOrganizationId,
		source,
		receiverUserDetails,
		showCallModalType : 'fullCallModal',
		isSelfIntiated    : true,
	}));
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
		source = '',
		orgData = {},
	} = voiceCallData || {};

	const { selfOrganizationId = '' } = orgData || {};

	const makeCallApi = useCallback(async () => {
		try {
			setCallStateData({
				mobile_number,
				orgId,
				userId,
				userName,
				setCallState,
				selfOrganizationId,
				source,
			});

			await trigger({
				data: getPayload({
					isUnkownUser,
					mobile_country_code,
					mobile_number,
					orgId,
					userId,
					loggedInAgentId,
					source,
				}),
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message?.[GLOBAL_CONSTANTS.zeroth_index] || 'Something Went Wrong');
			unmountVoiceCall();
		}
	}, [isUnkownUser, loggedInAgentId, mobile_country_code, selfOrganizationId,
		mobile_number, orgId, setCallState, trigger, unmountVoiceCall, userId, userName, source]);

	return {
		makeCallApi,
		callLoading: loading,
	};
}
export default useOutgoingCall;
