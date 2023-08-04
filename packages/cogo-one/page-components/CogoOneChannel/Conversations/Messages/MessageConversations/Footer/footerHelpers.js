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
