import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const CHECK_ONE_OR_MORE_ELEMENTS = 1;
const NULL_SUBJECT_LENGTH = 0;
const MAXIMUM_ALLOWED_SUBJECT_LENGTH = 250;

const EMAIL_SUBJECT_PREFIX_MAPPING = {
	reply     : 'RE',
	reply_all : 'RE',
	forward   : 'FW',
};

export function getSubject({ subject = '', buttonType = '' }) {
	const formatedSubject = subject.replace(GLOBAL_CONSTANTS.regex_patterns.email_subject_prefix, '').trim();

	const emailPrefix = EMAIL_SUBJECT_PREFIX_MAPPING[buttonType] || '';

	return (formatedSubject?.length || NULL_SUBJECT_LENGTH) > MAXIMUM_ALLOWED_SUBJECT_LENGTH
		? subject : `${emailPrefix}: ${formatedSubject}`;
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

export function getRecipientData({
	setButtonType = () => {},
	setEmailState = () => {},
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
}) {
	const filteredRecipientData = recipientData.filter((itm) => itm.toLowerCase() !== activeMailAddress?.toLowerCase());
	const filteredCcData = ccData.filter((itm) => itm.toLowerCase() !== activeMailAddress?.toLowerCase());
	const filteredBccData = bccData.filter((itm) => itm.toLowerCase() !== activeMailAddress?.toLowerCase());

	const handleClick = ({ buttonType = '', data = {} }) => {
		if (isDraft) {
			setButtonType('send_mail');
			setEmailState(
				(prev) => ({
					...prev,
					body          : data?.body?.content,
					subject       : data?.subject,
					toUserEmail   : recipientData || [],
					ccrecipients  : ccData || [],
					bccrecipients : bccData || [],
				}),
			);
			return;
		}

		setButtonType(buttonType);

		let mailData = {};

		if (buttonType === 'reply') {
			mailData = getReplyMails({
				filteredRecipientData,
				senderAddress,
				activeMailAddress,
				filteredCcData,
				filteredBccData,
			});
		} else if (buttonType === 'reply_all') {
			mailData = getReplyAllMails({
				filteredRecipientData,
				senderAddress,
				activeMailAddress,
				filteredCcData,
				filteredBccData,
			});
		}

		const newSubject = getSubject({ subject, buttonType });

		setEmailState(
			(prev) => ({
				...prev,
				emailVia,
				body          : '',
				from_mail     : activeMailAddress,
				subject       : newSubject || subject,
				toUserEmail   : mailData?.toUserEmail || [],
				ccrecipients  : mailData?.ccrecipients || [],
				bccrecipients : mailData?.bccrecipients || [],
				formattedData,
				eachMessage,
			}),
		);
	};

	return { handleClick, filteredCcData, filteredBccData, filteredRecipientData };
}
