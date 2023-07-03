import { Toast } from '@cogoport/components';
import { getDoc } from 'firebase/firestore';

const NO_OF_HOURS_IN_A_DAY = 24;
const NO_OF_MILLI_SECONDS_IN_A_HOUR = 36e5;

const sendUserMessage = async ({
	fileType = '',
	finalUrl = '',
	fileName = '',
	formattedData = {},
	channelType = '',
	messageFireBaseDoc,
	newMessage = '',
	user_name = '',
	sendMessage = () => {},
	scrollToBottom = () => {},
}) => {
	const isGreaterThan24hours = (newMessageSentAt) => {
		const lastMessageTime = new Date(newMessageSentAt);
		const currentTime = new Date();
		const hoursDifference = Math.abs(currentTime - lastMessageTime) / NO_OF_MILLI_SECONDS_IN_A_HOUR;
		return hoursDifference >= NO_OF_HOURS_IN_A_DAY && channelType === 'whatsapp';
	};

	const document = await getDoc(messageFireBaseDoc);

	if (isGreaterThan24hours(document?.data()?.new_message_sent_at)) {
		Toast.error('Message cannot be sent after 24 hours.Try sending a Template Instead');
		return;
	}

	const adminChat = {
		conversation_type : 'received',
		message_type      : finalUrl ? fileType : 'text',
		response          : {
			message   : newMessage,
			media_url : finalUrl,
		},
		created_at   : Date.now(),
		send_by      : user_name,
		session_type : 'admin',

	};

	const {
		user_id = null,
		organization_id = null,
		mobile_no = '',
		lead_user_id = null,
		sender = null,
	} = formattedData || {};

	let messageMetadata;

	const modifiedFileType = (fileType === 'image' && channelType === 'telegram') ? 'photo' : fileType;

	if (finalUrl) {
		messageMetadata = {
			message_type : modifiedFileType,
			text         : newMessage,
			media_url    : finalUrl,
			filename     : fileName,
			session_type : 'admin',
		};
	} else {
		messageMetadata = {
			message_type : 'text',
			text         : newMessage,
			session_type : 'admin',
		};
	}

	sendMessage({
		recipient        : mobile_no || sender,
		message          : newMessage,
		user_id,
		organization_id,
		message_metadata : messageMetadata,
		lead_user_id,
		adminChat,
		document,
		messageFireBaseDoc,
		scrollToBottom,
	});
};

export default sendUserMessage;
