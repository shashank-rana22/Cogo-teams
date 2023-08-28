import { isEmpty } from '@cogoport/utils';

const formatData = ({ callDetails = {}, loggedInAgentId = '' }) => {
	const {
		user_details = {},
		lead_user_details = {},
		user_number = '',
		call_type = '',
		attendees = [],
		live_call_status = '',
		id = '',
		start_time_of_call = '',
		agent_id = '',
		call_id = '',
		organization_id = '',
		agent_details = {},
	} = callDetails || {};

	if (isEmpty(callDetails)) {
		return {};
	}

	const isSelfIntiated = loggedInAgentId === agent_id;

	const commonData = {
		isSelfIntiated,
		receiverUserDetails: {
			mobile_number        : user_number,
			user_id              : user_details?.id || '',
			lead_user_id         : lead_user_details?.id || '',
			userName             : user_details?.name || lead_user_details?.name,
			organization_id,
			lead_organization_id : lead_user_details?.lead_organization_id,
		},
		callId        : call_id,
		callRecordId  : id,
		attendees     : attendees?.sort((a, b) => Date.now(b?.updated_at) - Date.now(a?.updated_at)),
		mainAgentName : agent_details?.name || 'Agent',
		...(lead_user_details?.lead_organization_id
			? { lead_organization_id: lead_user_details?.lead_organization_id } : {}),
	};

	if (!isSelfIntiated) {
		const attendeeData = attendees?.find((atendee) => atendee?.agent_id === loggedInAgentId);

		const { call_type:conferenceType = '', updated_at = '', call_status = '' } = attendeeData || {};

		if (call_status === 'not_connected') {
			return {};
		}

		return {
			...commonData,
			callStartAt : updated_at,
			status      : call_status === 'answered' ? 'in_progress' : null,
			conferenceType,
		};
	}

	return {
		...commonData,
		callStartAt : start_time_of_call,
		callType    : call_type,
		status      : live_call_status,
	};
};

export default formatData;
