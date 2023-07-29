import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import sendUserMessage from '../helpers/sendUserMessage';

import useSendMessage from './useSendMessage';

const useSendChat = ({
	setDraftMessages,
	activeChatCollection,
	draftMessages,
	firestore,
	channelType,
	uploadedFile = {},
	setDraftUploadedFiles,
	id,
	formattedData,
	canMessageOnBotSession,
	assignChat,
	scrollToBottom,
	hasUploadedFiles,
}) => {
	const { user_name } = useSelector(({ profile }) => ({
		user_name: profile?.user?.name,
	}));

	const { sendMessage, loading } = useSendMessage({
		channelType,
		activeChatCollection,
		formattedData,
		assignChat,
		canMessageOnBotSession,
	});

	let messageFireBaseDoc;

	if (id && channelType) {
		messageFireBaseDoc = doc(
			firestore,
			`${FIRESTORE_PATH[channelType]}/${id}`,
		);
	}

	const sendChatMessage = async () => {
		const newMessage = draftMessages?.[id]?.trim() || '';

		const { fileName, fileUrl, type } = uploadedFile;

		setDraftMessages((prev) => ({ ...prev, [id]: '' }));
		setDraftUploadedFiles((prev) => ({ ...prev, [id]: undefined }));

		if (isEmpty(newMessage?.trim()) && !hasUploadedFiles) {
			return;
		}

		await sendUserMessage({
			fileType : type,
			finalUrl : fileUrl,
			fileName,
			formattedData,
			channelType,
			messageFireBaseDoc,
			newMessage,
			sendMessage,
			user_name,
			scrollToBottom,
		});
	};

	const sendQuickSuggestions = async ({ val }) => {
		await sendUserMessage({
			formattedData,
			channelType,
			messageFireBaseDoc,
			newMessage: val,
			sendMessage,
			user_name,
			scrollToBottom,
		});
	};

	return {
		sendChatMessage,
		sendQuickSuggestions,
		messageLoading: loading,
	};
};

export default useSendChat;
