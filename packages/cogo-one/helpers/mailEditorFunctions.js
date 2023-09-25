import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useReplyMail from '../hooks/useReplyMail';
import useSaveDraft from '../hooks/useSaveDraft';
import useSendOmnichannelMail from '../hooks/useSendOmnichannelMail';

import getFormatedEmailBody from './getFormatedEmailBody';
import getRenderEmailBody from './getRenderEmailBody';

function useMailEditorFunctions({
	uploading = false,
	activeMail = {},
	attachments = [],
	userId = '',
	mailProps = {},
	firestore = {},
	sendLoading = false,
	setSendLoading = () => {},
}) {
	const {
		buttonType = '',
		activeMailAddress = '',
		emailState = {},
		setEmailState = () => {},
		setButtonType = () => {},
		resetEmailState = () => {},
	} = mailProps || {};

	const {
		emailVia = '',
		formattedData = {},
		eachMessage = {},
		toUserEmail = [],
		subject = '',
		from_mail = [],
		ccrecipients = [],
		bccrecipients = [],
		body = '',
		draftMessageData = {},
	} = emailState || {};

	const handlePayload = () => {
		const emailBody = getRenderEmailBody({ html: body });

		return {
			sender  : from_mail || activeMailAddress,
			toUserEmail,
			ccrecipients,
			bccrecipients,
			subject,
			content : emailBody,
			msgId   : buttonType !== 'send_mail' ? activeMail?.id : undefined,
			attachments,
			userId,
		};
	};

	const { saveDraft = () => {} } = useSaveDraft({
		setSendLoading,
		firestore,
		draftMessageData,
		buttonType,
		rteEditorPayload  : handlePayload(),
		roomData          : formattedData,
		parentMessageData : eachMessage,
		setEmailState,
		body,
	});

	const {
		replyMailApi = () => {},
		replyLoading = false,
	} = useReplyMail({ ...mailProps, saveDraft });

	const {
		mailLoading = false,
		sendMail = () => {},
	} = useSendOmnichannelMail({
		setEmailState,
		setButtonType,
		saveDraft,
	});

	const handleSend = () => {
		if (replyLoading || mailLoading || sendLoading) {
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

		const isEmptyMail = getFormatedEmailBody({ emailState });

		if (isEmptyMail || !subject) {
			Toast.error('Both Subject and Body are Required');
			return;
		}

		const payload = handlePayload();

		if (emailVia === 'firebase_emails') {
			sendMail({
				source        : from_mail || activeMailAddress,
				uploadedFiles : attachments,
				formattedData,
				mailActions   : {
					actionType : buttonType,
					data       : eachMessage,
				},
				emailState,
				dataForFirebase: payload,
			});
			return;
		}
		replyMailApi(payload);
	};

	const handleSaveDraft = async ({ isMinimize = false } = {}) => {
		if (sendLoading) {
			return;
		}

		if (uploading) {
			Toast.error('Files are uploading...');
			return;
		}

		const isEmptyMail = getFormatedEmailBody({ emailState });

		if (isEmptyMail && isEmpty(attachments)) {
			Toast.error('There is nothing in email body to save as draft');
			return;
		}

		await saveDraft({ isMinimize });

		if (isMinimize) {
			return;
		}

		setButtonType('');
		resetEmailState();
		Toast.success('Draft has saved successfully');
	};

	return {
		handleSend,
		handleSaveDraft,
		replyLoading: replyLoading || mailLoading,
	};
}

export default useMailEditorFunctions;
