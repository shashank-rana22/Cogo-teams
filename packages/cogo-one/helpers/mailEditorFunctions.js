import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import useReplyMail from '../hooks/useReplyMail';
import useSaveDraft from '../hooks/useSaveDraft';
import useSendOmnichannelMail from '../hooks/useSendOmnichannelMail';
import { getTimeZone } from '../utils/timeLineFunctions';

import getRenderEmailBody from './getRenderEmailBody';

const LIMIT_FOR_BODY_PREVIEW = 200;

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
		rteContent = '',
		rawRTEContent = '',
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

	const handlePayload = async (isUploadFile = false) => {
		const emailBody = await getRenderEmailBody({ html: `${rteContent}<br/>${body}`, isUploadFile });

		return {
			sender    : from_mail || activeMailAddress,
			toUserEmail,
			ccrecipients,
			bccrecipients,
			subject   : subjectToSend,
			content   : emailBody,
			msgId     : buttonType !== 'send_mail' ? activeMail?.id : undefined,
			attachments,
			userId,
			time_zone : getTimeZone(),
		};
	};

	const { saveDraft = () => {} } = useSaveDraft({
		setSendLoading,
		firestore,
		draftMessageData,
		buttonType,
		getRteEditorPayload : handlePayload,
		roomData            : formattedData,
		parentMessageData   : eachMessage,
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

	const handleSend = async () => {
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

		if (!subjectToSend) {
			Toast.error('Subject is Required.');
			return;
		}

		const payload = await handlePayload(true);

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
			});
			return;
		}

		replyMailApi({
			payload,
			bodyPreview: rawRTEContent?.slice(
				GLOBAL_CONSTANTS.zeroth_index,
				LIMIT_FOR_BODY_PREVIEW,
			) || '',
		});
	};

	const handleSaveDraft = async ({ isMinimize = false } = {}) => {
		if (sendLoading) {
			return;
		}

		if (uploading) {
			Toast.error('Files are uploading...');
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
