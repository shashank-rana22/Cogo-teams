import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { doc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import sendUserMessage from '../helpers/sendUserMessage';
import getFileAttributes from '../utils/getFileAttributes';

import useSendMessage from './useSendMessage';

const useSendChat = ({
	setDraftMessages,
	activeChatCollection,
	draftMessages,
	firestore,
	channel_type,
	draftUploadedFiles,
	setDraftUploadedFiles,
	id,
	formattedData,
}) => {
	const { user_name } = useSelector(({ profile }) => ({
		user_name: profile?.user?.name,
	}));

	const { sendMessage, loading } = useSendMessage({ channel_type, activeChatCollection });

	let messageFireBaseDoc;
	if (id && channel_type) {
		messageFireBaseDoc = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}`,
		);
	}

	const sendChatMessage = async (scrollToBottom) => {
		const newMessage = draftMessages?.[id]?.trim() || '';

		const urlArray = decodeURI(draftUploadedFiles?.[id])?.split('/');
		const fileName = urlArray[(urlArray?.length || 0) - 1] || '';
		const { finalUrl = '', fileType = '' } = getFileAttributes({
			finalUrl: draftUploadedFiles?.[id], fileName,
		});

		setDraftMessages((p) => ({ ...p, [id]: '' }));
		setDraftUploadedFiles((p) => ({ ...p, [id]: undefined }));

		if (!isEmpty(newMessage?.trim()) || finalUrl) {
			await sendUserMessage({
				fileType,
				finalUrl,
				fileName,
				formattedData,
				channel_type,
				messageFireBaseDoc,
				newMessage,
				sendMessage,
				user_name,
				scrollToBottom,
			});
		}
	};

	const sentQuickSuggestions = async (val, scrollToBottom) => {
		await sendUserMessage({
			formattedData,
			channel_type,
			messageFireBaseDoc,
			newMessage: val,
			sendMessage,
			user_name,
			scrollToBottom,
		});
	};

	return {
		sendChatMessage,
		messageFireBaseDoc,
		sentQuickSuggestions,
		messageLoading: loading,
	};
};

export default useSendChat;
