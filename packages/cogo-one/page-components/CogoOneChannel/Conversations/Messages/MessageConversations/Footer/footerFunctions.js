export const getPlaceHolder = ({ hasPermissionToEdit = false, canMessageOnBotSession = false }) => {
	if (canMessageOnBotSession) {
		return 'This chat is currently in bot session, send a message to talk with customer';
	}
	if (hasPermissionToEdit) {
		return 'Type your message...';
	}
	return 'You do not have permission to chat';
};
