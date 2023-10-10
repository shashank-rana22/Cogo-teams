import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const CHECK_ONE_OR_MORE_ELEMENTS = 1;
const NULL_SUBJECT_LENGTH = 0;
const MAXIMUM_ALLOWED_SUBJECT_LENGTH = 250;

const CREATE_DRAFT_FOR = ['reply', 'reply_all'];

const EMAIL_SUBJECT_PREFIX_MAPPING = {
	reply     : 'RE',
	reply_all : 'RE',
	forward   : 'FW',
};

export function getSubject({ subject = '', newButtonType = '' }) {
	const formattedSubject = subject.replace(GLOBAL_CONSTANTS.regex_patterns.email_subject_prefix, '').trim();

	const emailPrefix = EMAIL_SUBJECT_PREFIX_MAPPING[newButtonType] || '';

	return (formattedSubject?.length || NULL_SUBJECT_LENGTH) > MAXIMUM_ALLOWED_SUBJECT_LENGTH
		? subject : `${emailPrefix}: ${formattedSubject}`;
}

const getReplyMails = ({
	filteredRecipientData = [],
	senderAddress = '',
	activeMailAddress = '',
	filteredCcData = [],
	filteredBccData = [],
}) => {
	if (
		activeMailAddress?.toLowerCase() !== senderAddress?.toLowerCase()
		|| filteredRecipientData.length !== CHECK_ONE_OR_MORE_ELEMENTS
		|| !(filteredRecipientData.length === CHECK_ONE_OR_MORE_ELEMENTS
			&& isEmpty(filteredCcData)
			&& isEmpty(filteredBccData)
		) || isEmpty(filteredRecipientData)
	) {
		return { toUserEmail: [senderAddress] };
	}

	return { toUserEmail: filteredRecipientData };
};

const getReplyAllMails = ({
	filteredRecipientData = [],
	senderAddress = '',
	activeMailAddress = '',
	filteredCcData = [],
	filteredBccData = [],
}) => {
	let toUserEmail = filteredRecipientData;

	if (senderAddress?.toLowerCase() !== activeMailAddress?.toLowerCase()) {
		toUserEmail = [senderAddress, ...toUserEmail];
	}

	return {
		toUserEmail,
		ccrecipients  : filteredCcData,
		bccrecipients : filteredBccData,
	};
};

const getDraftPayload = ({ mailData, subject, activeMailAddress, msgId, signature }) => ({
	sender        : activeMailAddress,
	toUserEmail   : mailData?.toUserEmail || [],
	ccrecipients  : mailData?.ccrecipients || [],
	bccrecipients : mailData?.bccrecipients || [],
	msgId,
	subject,
	signature,
});

export function getRecipientData({
	mailProps = {},
	senderAddress = '',
	recipientData = [],
	ccData = [],
	bccData = [],
	activeMailAddress = '',
	subject = '',
	isDraft = false,
	emailVia = '',
	formattedData = {},
	eachMessage = {},
	deleteMessage = () => {},
	createReplyDraft = () => {},
	createReplyAllDraft = () => {},
	signature = '',
	draftQuillBody = {},
}) {
	const {
		setButtonType = () => {},
		setEmailState = () => {},
		buttonType = '',
		setMailAttachments = () => {},
	} = mailProps || {};

	const { response = {}, created_at = '', id = '', parent_email_message = {} } = eachMessage || {};

	const {
		sender = '',
		draft_type = '',
		subject: draftSubject = '',
		to_mails = [],
		cc_mails = [],
		bcc_mails = [],
		message_id = '',
		attachments = [],
		custom_subject = {},
		org_id = '',
		orgData = {},
		user_ids = {},
	} = response || {};

	const filteredRecipientData = recipientData?.filter(
		(itm) => itm.toLowerCase() !== activeMailAddress?.toLowerCase(),
	) || [];
	const filteredCcData = ccData?.filter((itm) => itm.toLowerCase() !== activeMailAddress?.toLowerCase()) || [];
	const filteredBccData = bccData?.filter((itm) => itm.toLowerCase() !== activeMailAddress?.toLowerCase()) || [];

	const handleClick = ({
		buttonType: newButtonType = '',
	}) => {
		if (newButtonType === 'delete') {
			deleteMessage({ timestamp: created_at, messageDocId: id });
			return;
		}

		if (buttonType) {
			Toast.warn('Email compose already in progress');
			return;
		}

		if (isDraft) {
			setButtonType(draft_type);

			setEmailState(
				(prev) => ({
					...prev,
					emailVia,
					rteContent       : draftQuillBody?.rte_content?.content || '',
					body             : draftQuillBody?.body?.content || '',
					from_mail        : sender || '',
					subject          : draftSubject || '',
					toUserEmail      : to_mails || [],
					ccrecipients     : cc_mails || [],
					bccrecipients    : bcc_mails || [],
					formattedData,
					eachMessage      : parent_email_message,
					draftMessageData : eachMessage,
					customSubject    : custom_subject,
					orgId            : org_id,
					user_ids,
					orgData,
					draftQuillBody,
				}),
			);

			setMailAttachments(attachments);
			return;
		}

		setButtonType(newButtonType);

		let mailData = {};
		const newSubject = getSubject({ subject, newButtonType });

		if (newButtonType === 'reply') {
			mailData = getReplyMails({
				filteredRecipientData,
				senderAddress,
				activeMailAddress,
				filteredCcData,
				filteredBccData,
			});
		} else if (newButtonType === 'reply_all') {
			mailData = getReplyAllMails({
				filteredRecipientData,
				senderAddress,
				activeMailAddress,
				filteredCcData,
				filteredBccData,
			});
		}

		setEmailState(
			(prev) => ({
				...prev,
				emailVia,
				rteContent: '',
				body:
				emailVia === 'firebase_emails' && !CREATE_DRAFT_FOR.includes(newButtonType) ? signature : '',
				from_mail        : activeMailAddress,
				subject          : newSubject || subject,
				toUserEmail      : mailData?.toUserEmail || [],
				ccrecipients     : mailData?.ccrecipients || [],
				bccrecipients    : mailData?.bccrecipients || [],
				formattedData,
				eachMessage,
				draftMessageData : {},
			}),
		);

		if (CREATE_DRAFT_FOR.includes(newButtonType) && emailVia === 'firebase_emails') {
			const payload = getDraftPayload({
				mailData,
				subject : newSubject || subject,
				activeMailAddress,
				msgId   : message_id,
				signature,
			});

			const callbackFunc = ({ content }) => {
				setEmailState(
					(prev) => ({
						...prev,
						body: content,
					}),
				);
			};
			const draftFunc = newButtonType === 'reply' ? createReplyDraft : createReplyAllDraft;

			draftFunc({ payload, callbackFunc });
		}
	};

	return { handleClick, filteredCcData, filteredBccData, filteredRecipientData };
}
