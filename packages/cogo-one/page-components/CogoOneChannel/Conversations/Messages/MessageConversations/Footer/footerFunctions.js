import { isEmpty } from '@cogoport/utils';

const CHECK_REPLAY_TYPE = ['reply', 'reply_all'];

export const getCanSendMessage = ({
	emailState = {},
	channelType = '',
}) => {
	if (channelType !== 'email') {
		return true;
	}

	const { subject = '', toUserEmail = [] } = emailState || {};

	return (!isEmpty(subject) && !isEmpty(toUserEmail));
};

export const getPlaceHolder = ({ hasPermissionToEdit = false, canMessageOnBotSession = false }) => {
	if (canMessageOnBotSession) {
		return 'This chat is currently in bot session, send a message to talk with customer';
	}
	if (hasPermissionToEdit) {
		return 'Type your message...';
	}
	return 'You do not have permission to chat';
};

export const getEmailState = ({ mailActions = {}, email = '' }) => {
	const { data, actionType = '' } = mailActions || {};
	const { response, conversation_type } = data || {};
	const { sender = '', subject = '', to_mails = [], bcc_mails = [], cc_mails = [] } = response || {};

	let toEmail = [sender || email];

	if (conversation_type === 'received') {
		toEmail = to_mails;
	}

	return {
		toUserEmail   : CHECK_REPLAY_TYPE.includes(actionType) ? toEmail : [],
		bccrecipients : actionType === 'reply_all' ? bcc_mails : [],
		ccrecipients  : actionType === 'reply_all' ? cc_mails : [],
		subject,
	};
};
