import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useReplyMail from '../hooks/useReplyMail';

import getFormatedEmailBody from './getFormatedEmailBody';
import getRenderEmailBody from './getRenderEmailBody';

function useMailEditorFunctions({
	uploading = false,
	attachments = [],
	userId = '',
	emailState = {},
	setEmailState = () => { },
	setButtonType = () => { },
	buttonType = '',
	activeMailAddress = '',
	userName = '',
	userSharedMails = [],
	email = '',
}) {
	const {
		toUserEmail = [],
		subject = '',
		from_mail = [],
		ccrecipients = [],
		bccrecipients = [],
		body = '',
		userEmailAddress = '',
	} = emailState || {};

	const {
		replyMailApi = () => { },
		replyLoading = false,
	} = useReplyMail({
		setEmailState,
		buttonType,
		setButtonType,
		userId,
		userName,
		userSharedMails,
		userEmailAddress,
		email,
	});

	const handleSend = () => {
		const isEmptyMail = getFormatedEmailBody({ emailState });
		if (replyLoading) {
			return;
		}

		if (uploading) {
			Toast.error('Files are uploading...');
			return;
		}

		if (isEmpty(toUserEmail)) {
			Toast.error('To Mail is Required');
			return;
		}

		if (isEmptyMail || !subject) {
			Toast.error('Both Subject and Body are Requied');
			return;
		}

		const emailBody = getRenderEmailBody({ html: body });

		const payload = {
			sender  : from_mail || activeMailAddress,
			toUserEmail,
			ccrecipients,
			bccrecipients,
			subject,
			content : emailBody,
			attachments,
			userId,

		};
		replyMailApi(payload);
	};

	return {
		handleSend,
		replyLoading,
	};
}

export default useMailEditorFunctions;
