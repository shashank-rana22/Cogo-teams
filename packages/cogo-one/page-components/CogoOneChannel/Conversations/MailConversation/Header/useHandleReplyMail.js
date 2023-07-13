import { isEmpty } from '@cogoport/utils';

const CHECK_ONE_OR_MORE_ELEMENTS = 1;

const getReplyMails = ({
	filteredRecipientData = [],
	senderAddress = '',
	activeMailAddress = '',
	filteredCcData = [],
	filteredBccData = [],
}) => {
	let toUserEmail = [];

	if (
		activeMailAddress.toLowerCase() !== senderAddress.toLowerCase()
		|| filteredRecipientData.length !== CHECK_ONE_OR_MORE_ELEMENTS
		|| (filteredRecipientData.length === CHECK_ONE_OR_MORE_ELEMENTS
			&& isEmpty(filteredCcData)
			&& isEmpty(filteredBccData)
		) || isEmpty(filteredRecipientData)
	) {
		toUserEmail = [senderAddress];
	} else {
		toUserEmail = filteredRecipientData;
	}

	return { toUserEmail };
};

const getReplyAllMails = ({
	filteredRecipientData = [],
	senderAddress = '',
	activeMailAddress = '',
	filteredCcData = [],
	filteredBccData = [],
}) => {
	let toUserEmail = filteredRecipientData;
	const bccrecipients = filteredBccData;
	const ccrecipients = filteredCcData;

	if (senderAddress.toLowerCase() !== activeMailAddress.toLowerCase()) {
		toUserEmail = [senderAddress, ...toUserEmail];
	}

	return { toUserEmail, ccrecipients, bccrecipients };
};

const useHandleReplyMail = ({
	setButtonType = () => {},
	setEmailState = () => {},
	senderAddress = '',
	recipientData = [],
	ccData = [],
	bccData = [],
	activeMailAddress = '',
	subject = '',
}) => {
	const filteredRecipientData = recipientData.filter((itm) => itm.toLowerCase() !== activeMailAddress.toLowerCase());
	const filteredCcData = ccData.filter((itm) => itm.toLowerCase() !== activeMailAddress.toLowerCase());
	const filteredBccData = bccData.filter((itm) => itm.toLowerCase() !== activeMailAddress.toLowerCase());

	const handleClick = (val) => {
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

		setEmailState(
			(prev) => ({
				...prev,
				subject,
				body          : '',
				toUserEmail   : mailData?.toUserEmail || [],
				ccrecipients  : mailData?.ccrecipients || [],
				bccrecipients : mailData?.bccrecipients || [],
			}),
		);
	};

	return { handleClick };
};

export default useHandleReplyMail;
