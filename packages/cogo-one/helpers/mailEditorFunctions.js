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
	showOrgSpecificMail = false,
}) {
	const {
		buttonType = '',
		activeMailAddress = '',
		emailState = {},
		setEmailState = () => {},
		setButtonType = () => {},
		resetEmailState = () => {},
		setMailAttachments = () => {},
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
		customSubject = {},
	} = emailState || {};

	let subjectToSend = subject;

	if (showOrgSpecificMail) {
		if (customSubject?.serialId === 'custom' && customSubject?.subjectText) {
			subjectToSend = customSubject?.subjectText;
		} else if (customSubject?.serialId && customSubject?.subjectText) {
			subjectToSend = `${customSubject?.serialId} | ${customSubject?.subjectText}`;
		} else {
			subjectToSend = '';
		}
	}

	const handlePayload = () => {
		const emailBody = getRenderEmailBody({ html: body });

		return {
			sender  : from_mail || activeMailAddress,
			toUserEmail,
			ccrecipients,
			bccrecipients,
			subject : subjectToSend,
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
		emailState,
		showOrgSpecificMail,
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
		setMailAttachments,
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

		if (isEmptyMail || !subjectToSend) {
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
