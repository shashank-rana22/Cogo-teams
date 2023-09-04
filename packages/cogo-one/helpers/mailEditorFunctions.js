import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useReplyMail from '../hooks/useReplyMail';
import useSendOmnichannelMail from '../hooks/useSendOmnichannelMail';

import getFormatedEmailBody from './getFormatedEmailBody';
import getRenderEmailBody from './getRenderEmailBody';

function useMailEditorFunctions({
	uploading = false,
	activeMail = {},
	attachments = [],
	userId = '',
	mailProps = {},
}) {
	const {
		buttonType = '',
		activeMailAddress = '',
		emailState = {},
		setEmailState = () => {},
		setButtonType = () => {},
	} = mailProps || {};

	const {
		emailVia = '',
		formattedData = {},
	} = emailState || {};

	const {
		replyMailApi = () => {},
		replyLoading = false,
	} = useReplyMail(mailProps);

	const {
		mailLoading = false,
		sendMail = () => {},
	} = useSendOmnichannelMail({
		setEmailState,
		setButtonType,
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

		if (isEmpty(emailState?.toUserEmail)) {
			Toast.error('To Mail is Required');
			return;
		}

		if (isEmptyMail || !emailState?.subject) {
			Toast.error('Both Subject and Body are Requied');
			return;
		}

		const emailBody = getRenderEmailBody({ html: emailState?.body });

		const payload = {
			sender        : emailState?.from_mail || activeMailAddress,
			toUserEmail   : emailState?.toUserEmail,
			ccrecipients  : emailState?.ccrecipients,
			bccrecipients : emailState?.bccrecipients,
			subject       : emailState?.subject,
			content       : emailBody,
			msgId         : buttonType !== 'send_mail' ? activeMail?.id : undefined,
			attachments,
			userId,

		};
		if (emailVia === 'firebase_emails') {
			sendMail({
				source        : emailState?.from_mail || activeMailAddress,
				uploadedFiles : attachments,
				formattedData,
				mailActions   : {
					actionType : buttonType,
					data       : {
						response: buttonType !== 'send_mail'
							? activeMail?.id : undefined,
					},
				},
				emailState,
			});
			return;
		}
		replyMailApi(payload);
	};

	return {
		handleSend,
		replyLoading: replyLoading || mailLoading,
	};
}

export default useMailEditorFunctions;
