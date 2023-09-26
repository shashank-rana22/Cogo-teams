import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useLensRequest, useRequest } from '@cogoport/request';

import { DEFAULT_EMAIL_STATE } from '../mailConstants';

const getLensPayload = ({ payload }) => payload;

const getCommunicationPayload = ({ payload = {}, userId = '', userName = '', userSharedMails = [] }) => ({
	type             : 'rpa_email',
	recipient        : payload?.toUserEmail?.[GLOBAL_CONSTANTS.zeroth_index],
	message_metadata : {
		endpoint            : '/send_mail',
		body                : payload,
		send_to_omnichannel : !!userSharedMails?.includes(payload?.sender),
		sender_user_id      : userId,
		send_by             : userName,
	},
	sender_user_id : userId,
	service        : 'user',
	service_id     : userId,
	sender         : payload?.sender,
	source         : 'outstanding',
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

function useReplyMail({
	setEmailState = () => {},
	buttonType = 'send_mail',
	setButtonType = () => {},
	userId = '',
	userName = '',
	userSharedMails = [],
	email = '',
	userEmailAddress = '',
}) {
	const {
		endPoint = '',
		requestFunc = () => { },
		payloadFunc: getPayload = () => { },
	} = API_MAPPING[buttonType] || API_MAPPING.send_mail;

	const [{ loading } = {}, trigger] = requestFunc({
		url    : `/${endPoint}`,
		method : 'POST',
	}, { manual: true }) || [];

	const replyMailApi = async (payload) => {
		try {
			await trigger({
				data: getPayload({ payload, userId, userName, userSharedMails }),
			});
			Toast.success('Mail Sent Successfully.');
			setEmailState({
				...DEFAULT_EMAIL_STATE,
				toUserEmail : [email],
				from_mail   : userEmailAddress,
			});
			setButtonType('');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something Went Wrong');
		}
	};

	return {
		replyMailApi,
		replyLoading: loading,
	};
}

export default useReplyMail;