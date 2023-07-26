import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import sendUserMessage from '../helpers/sendUserMessage';
import getFileAttributes from '../utils/getFileAttributes';

import useSendMessage from './useSendMessage';

const DEFAULT_URL_ARRAY_LENGTH = 0;
const LAST_ELEMENT_IN_A_ARRAY = 1;

const useSendChat = ({
	setDraftMessages,
	activeChatCollection,
	draftMessages,
	firestore,
	channelType,
	draftUploadedFiles,
	setDraftUploadedFiles,
	id,
	formattedData,
	canMessageOnBotSession,
	assignChat,
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

	const sendChatMessage = async (scrollToBottom) => {
		const newMessage = draftMessages?.[id]?.trim() || '';

		const urlArray = decodeURI(draftUploadedFiles?.[id])?.split('/');

		const fileName = urlArray[(urlArray?.length || DEFAULT_URL_ARRAY_LENGTH) - LAST_ELEMENT_IN_A_ARRAY] || '';

		const { finalUrl = '', fileType = '' } = getFileAttributes({
			finalUrl: draftUploadedFiles?.[id], fileName,
		});

		setDraftMessages((prev) => ({ ...prev, [id]: '' }));
		setDraftUploadedFiles((prev) => ({ ...prev, [id]: undefined }));

		if (isEmpty(newMessage?.trim()) && !finalUrl) {
			return;
		}

		await sendUserMessage({
			fileType,
			finalUrl,
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

	const sendQuickSuggestions = async ({ scrollToBottom, val }) => {
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
