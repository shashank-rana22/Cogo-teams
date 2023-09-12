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
	lead_user_id = '',
	lead_organization_id = '',
	mobile_country_code = '',
}) => {
	const receiverUserDetails = {
		mobile_number,
		user_id         : userId,
		userName,
		organization_id : orgId,
		lead_user_id,
		lead_organization_id,
		mobile_country_code,
	};

	setCallState((p) => ({
		...p,
		selfOrganizationId,
		source,
		receiverUserDetails,
		lead_organization_id,
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
		lead_user_id = '',
		lead_organization_id = '',
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
				lead_user_id,
				lead_organization_id,
				mobile_country_code,
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
	}, [
		isUnkownUser, lead_organization_id, lead_user_id,
		loggedInAgentId, mobile_country_code, mobile_number, orgId,
		setCallState, trigger, unmountVoiceCall, userId, userName, selfOrganizationId, source,
	]);

	return {
		makeCallApi,
		callLoading: loading,
	};
}
export default useOutgoingCall;
