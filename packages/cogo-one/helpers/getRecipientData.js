import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

const CHECK_ONE_OR_MORE_ELEMENTS = 1;
const NULL_SUBJECT_LENGTH = 0;
const MAXIMUM_ALLOWED_SUBJECT_LENGTH = 250;
const REPLY_EMAIL_SUBJECT_PREFIX = 'RE';
const FORWARD_EMAIL_SUBJECT_PREFIX = 'FW';

function getSubject({ subject = '', val = '' }) {
	const formatedSubject = subject.replace(GLOBAL_CONSTANTS.regex_patterns.email_subject_prefix, '').trim();

	const emailPrefix = val === 'forward'
		? FORWARD_EMAIL_SUBJECT_PREFIX
		: REPLY_EMAIL_SUBJECT_PREFIX;

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
		activeMailAddress.toLowerCase() !== senderAddress.toLowerCase()
		|| filteredRecipientData.length !== CHECK_ONE_OR_MORE_ELEMENTS
		|| (filteredRecipientData.length === CHECK_ONE_OR_MORE_ELEMENTS
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

	if (senderAddress.toLowerCase() !== activeMailAddress.toLowerCase()) {
		toUserEmail = [senderAddress, ...toUserEmail];
	}

	return {
		toUserEmail,
		ccrecipients  : filteredCcData,
		bccrecipients : filteredBccData,
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
	const filteredRecipientData = recipientData.filter((itm) => itm.toLowerCase() !== activeMailAddress.toLowerCase());
	const filteredCcData = ccData.filter((itm) => itm.toLowerCase() !== activeMailAddress.toLowerCase());
	const filteredBccData = bccData.filter((itm) => itm.toLowerCase() !== activeMailAddress.toLowerCase());

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
			});
		} else if (val === 'reply_all') {
			mailData = getReplyAllMails({
				filteredRecipientData,
				senderAddress,
				activeMailAddress,
				filteredCcData,
				filteredBccData,
			});
		}
		const newSubject = getSubject({ subject, val });

		setEmailState(
			(prev) => ({
				...prev,
				body          : '',
				subject       : newSubject || subject,
				toUserEmail   : mailData?.toUserEmail || [],
				ccrecipients  : mailData?.ccrecipients || [],
				bccrecipients : mailData?.bccrecipients || [],
			}),
		);
	};

	return { handleClick, filteredCcData, filteredBccData, filteredRecipientData };
};

export default getRecipientData;
