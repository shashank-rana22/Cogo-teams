import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

const CHECK_ONE_OR_MORE_ELEMENTS = 1;
const MAXIMUM_ALLOWED_SUBJECT_LENGTH = 250;

function removeEmailPrefix({ subject }) {
	return subject.replace(GLOBAL_CONSTANTS.regex_patterns.email_subject_prefix, '').trim();
}

const getReplyMails = ({
	filteredRecipientData = [],
	senderAddress = '',
	activeMailAddress = '',
	filteredCcData = [],
	filteredBccData = [],
	formatedSubject = '',
	subject = '',
}) => {
	const newSubject = (
		formatedSubject.length > MAXIMUM_ALLOWED_SUBJECT_LENGTH
	) ? subject.trim() : `RE: ${formatedSubject}`;

	if (
		activeMailAddress.toLowerCase() !== senderAddress.toLowerCase()
		|| filteredRecipientData.length !== CHECK_ONE_OR_MORE_ELEMENTS
		|| (filteredRecipientData.length === CHECK_ONE_OR_MORE_ELEMENTS
			&& isEmpty(filteredCcData)
			&& isEmpty(filteredBccData)
		) || isEmpty(filteredRecipientData)
	) {
		return { toUserEmail: [senderAddress], subject: newSubject };
	}

	return { toUserEmail: filteredRecipientData, subject: newSubject };
};

const getReplyAllMails = ({
	filteredRecipientData = [],
	senderAddress = '',
	activeMailAddress = '',
	filteredCcData = [],
	filteredBccData = [],
	formatedSubject = '',
	subject = '',
}) => {
	let toUserEmail = filteredRecipientData;

	const newSubject = (
		formatedSubject.length > MAXIMUM_ALLOWED_SUBJECT_LENGTH
	) ? subject.trim() : `RE: ${formatedSubject}`;

	if (senderAddress.toLowerCase() !== activeMailAddress.toLowerCase()) {
		toUserEmail = [senderAddress, ...toUserEmail];
	}

	return {
		toUserEmail,
		ccrecipients  : filteredCcData,
		bccrecipients : filteredBccData,
		subject       : newSubject,
	};
};

const getRecipientData = ({
	setButtonType = () => {},
	setEmailState = () => {},
	senderAddress = '',
	recipientData = [],
	ccData = [],
	bccData = [],
	activeMailAddress = '',
	subject = '',
	isDraft = false,
}) => {
	let newSubject = '';

	const filteredRecipientData = recipientData.filter((itm) => itm.toLowerCase() !== activeMailAddress.toLowerCase());
	const filteredCcData = ccData.filter((itm) => itm.toLowerCase() !== activeMailAddress.toLowerCase());
	const filteredBccData = bccData.filter((itm) => itm.toLowerCase() !== activeMailAddress.toLowerCase());
	const formatedSubject = removeEmailPrefix({ subject });

	const handleClick = (val) => {
		if (isDraft) {
			Toast.error(`you cant ${startCase(val)} the draft mail`);
			return;
		}
		setButtonType(val);

		let mailData = {};

		if (val === 'reply') {
			mailData = getReplyMails({
				filteredRecipientData,
				senderAddress,
				activeMailAddress,
				formatedSubject,
				subject,
			});
		} else if (val === 'reply_all') {
			mailData = getReplyAllMails({
				filteredRecipientData,
				senderAddress,
				activeMailAddress,
				filteredCcData,
				filteredBccData,
				formatedSubject,
				subject,
			});
		} else if (val === 'forward') {
			newSubject = (
				formatedSubject.length > MAXIMUM_ALLOWED_SUBJECT_LENGTH
			) ? subject.trim() : `FW: ${formatedSubject}`;
		}

		setEmailState(
			(prev) => ({
				...prev,
				body          : '',
				subject       : mailData?.subject || newSubject || subject,
				toUserEmail   : mailData?.toUserEmail || [],
				ccrecipients  : mailData?.ccrecipients || [],
				bccrecipients : mailData?.bccrecipients || [],
			}),
		);
	};

	return { handleClick, filteredCcData, filteredBccData, filteredRecipientData };
};

export default getRecipientData;
