import { useSelector } from '@cogoport/store';
import { doc, addDoc, getDoc, updateDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import getFileAttributes from '../utils/getFileAttributes';

const useSendChat = ({
	setDraftMessages,
	// setFiles,
	// messageFireBase,
	// messageFireBaseDoc,
	// files,
	// setFlag,
	activeChatCollection,
	draftMessages,
	// activeChat,
	// getUser,
	firestore,
	channel_type,
	draftUploadedFiles,
	setDraftUploadedFiles,
	id,
	setRoomData,
}) => {
	const { user_name } = useSelector(({ profile }) => ({
		user_name: profile?.user?.name,
	}));

	const messageFireBaseDoc = doc(
		firestore,
		`${FIRESTORE_PATH[channel_type]}/${id}`,
	);
	const sendChatMessage = async () => {
		const newMessage = draftMessages?.[id] || '';
		const { finalUrl, fileType } = getFileAttributes({ ...draftUploadedFiles?.[id] });
		setDraftMessages((p) => ({ ...p, [id]: '' }));
		setDraftUploadedFiles((p) => ({ ...p, [id]: undefined }));
		if (
			newMessage !== '' || finalUrl !== ''
		) {
			const adminChat = {
				conversation_type : 'received',
				response          : { message: newMessage },
				created_at        : Date.now(),
				send_by           : user_name,
				session_type      : 'admin',
				imgUrl            : fileType === 'image' ? finalUrl : '',
				pdfUrl            : fileType !== 'image' ? finalUrl : '',
			};
			await addDoc(activeChatCollection, adminChat);
			const doc1 = await getDoc(messageFireBaseDoc);
			const old_count = doc1.data().new_message_count_user;
			await updateDoc(messageFireBaseDoc, {
				new_message_count      : 0,
				last_message           : newMessage,
				updated_at             : Date.now(),
				new_message_count_user : old_count + 1,
			});
			// setFlag(true);
		}
	};
	const updatetags = async (val) => {
		await updateDoc(messageFireBaseDoc, {
			chat_tags  : val,
			updated_at : Date.now(),
		});
		const updatedDoc = await getDoc(messageFireBaseDoc);
		const updatedDocData = updatedDoc.data();
		setRoomData({ ...(updatedDocData || {}), id: updatedDoc?.id });
	};
	return { sendChatMessage, updatetags };
};

export default useSendChat;
