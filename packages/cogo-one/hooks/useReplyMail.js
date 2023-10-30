import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useLensRequest, useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import { DEFAULT_EMAIL_STATE } from '../constants/mailConstants';

import useAssignMeetingAgent from './useAssignMeetingAgent';

const getLensPayload = ({ payload }) => payload;

const getOmniChannelLink = ({ id, channel_type }) => {
	const OMNICHANNEL_URL = window.location.href.split('?')?.[GLOBAL_CONSTANTS.zeroth_index];
	return `${OMNICHANNEL_URL}?assigned_chat=${id}&channel_type=${channel_type}`;
};

const getCommunicationPayload = ({
	payload = {},
	userId = '',
	userName = '',
	userSharedMails = [],
	roomId = '',
	bodyPreview,
}) => ({
	type             : 'rpa_email',
	recipient        : payload?.toUserEmail?.[GLOBAL_CONSTANTS.zeroth_index],
	message_metadata : {
		endpoint            : '/send_mail',
		body                : payload,
		send_to_omnichannel : !!userSharedMails?.includes(payload?.sender),
		sender_user_id      : userId,
		send_by             : userName,
		body_preview        : bodyPreview,
		draft_url           : getOmniChannelLink({ id: roomId, channel_type: 'email' }),
	},
	sender_user_id  : userId,
	service         : 'user',
	service_id      : userId,
	sender          : payload?.sender,
	cc_emails       : isEmpty(payload?.ccrecipients) ? undefined : payload?.ccrecipients,
	bcc_emails      : isEmpty(payload?.bccrecipients) ? undefined : payload?.bccrecipients,
	attachment_urls : isEmpty(payload?.attachments) ? undefined : payload?.attachments,
	source          : 'CogoOne:AdminPlatform',
});

const API_MAPPING = {
	reply: {
		endPoint    : 'reply_mail',
		requestFunc : useLensRequest,
		payloadFunc : getLensPayload,
	},
	reply_all: {
		endPoint    : 'reply_all',
		requestFunc : useLensRequest,
		payloadFunc : getLensPayload,
	},
	forward: {
		endPoint    : 'forward_mail',
		requestFunc : useLensRequest,
		payloadFunc : getLensPayload,
	},
	send_mail: {
		endPoint    : 'create_communication',
		requestFunc : useRequest,
		payloadFunc : getCommunicationPayload,
	},
};

function useReplyMail(mailProps) {
	const {
		setEmailState = () => {},
		buttonType = 'send_mail',
		setButtonType = () => {},
		userId = '',
		userName = '',
		userSharedMails = [],
		saveDraft = () => {},
		setMailAttachments = () => {},
		emailState = {},
	} = mailProps;

	const { emailDemoData = {} } = emailState || {};
	const {
		agentId = '',
		calendarId = '',
		isEmail = false,
		scheduleId = '',
		source = '',
		requestId = '',
	} = emailDemoData || {};

	const {
		endPoint = '',
		requestFunc = () => {},
		payloadFunc: getPayload = () => {},
	} = API_MAPPING[buttonType] || API_MAPPING.send_mail;

	const { meetingAgent = () => {}, updateLoader = false } = useAssignMeetingAgent({});

	const [{ loading } = {}, trigger] = requestFunc({
		url    : `/${endPoint}`,
		method : 'POST',
	}, { manual: true }) || [];

	const replyMailApi = async ({ payload = {}, bodyPreview = '' }) => {
		try {
			let draftRoomData = {};

			if (buttonType === 'send_mail') {
				draftRoomData = await saveDraft();
			}

			const { roomId = '', messageId = '' } = draftRoomData || {};

			const res = await trigger({
				data: getPayload({ payload, userId, userName, userSharedMails, roomId, bodyPreview }),
			});
			if (buttonType === 'send_mail') {
				await saveDraft({
					communication_id     : res?.data?.id,
					newComposeRoomId     : roomId,
					newComposeDraftMsgId : messageId,
				});
			}

			if (res?.data?.id && source === 'email_demo') {
				await meetingAgent({
					isEmail,
					agentId,
					calendarId,
					scheduleId,
					communicationId : res?.data?.id,
					requestId,
					requestStatus   : 'processing',
				});
			}

			Toast.success('Mail Sent Successfully.');
			setEmailState(DEFAULT_EMAIL_STATE);
			setMailAttachments([]);
			setButtonType('');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something Went Wrong');
		}
	};

	return {
		replyMailApi,
		replyLoading: loading || updateLoader,
	};
}

export default useReplyMail;
