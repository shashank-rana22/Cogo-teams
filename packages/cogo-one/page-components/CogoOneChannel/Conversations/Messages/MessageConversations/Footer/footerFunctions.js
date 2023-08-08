import { isEmpty } from '@cogoport/utils';

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

export const getPlaceHolder = ({ hasPermissionToEdit, canMessageOnBotSession }) => {
	if (canMessageOnBotSession) {
		return 'This chat is currently in bot session, send a message to talk with customer';
	}
	if (hasPermissionToEdit) {
		return 'Type your message...';
	}
	return 'You do not have permission to chat';
};

export const setEmailStateFunc = ({ mailActions, email = '' }) => {
	const { data, actionType = '' } = mailActions || {};
	const { response, conversation_type } = data || {};
	const { sender = '', subject = '', to_mails = [] } = response || {};

	let toEmail = [sender || email];

	if (conversation_type === 'received') {
		toEmail = to_mails;
	}

	return {
		toUserEmail: actionType === 'reply' ? toEmail : [],
		subject,
	};
};
