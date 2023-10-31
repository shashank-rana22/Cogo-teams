import { getDoc } from 'firebase/firestore';

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
	const document = await getDoc(messageFireBaseDoc);

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
