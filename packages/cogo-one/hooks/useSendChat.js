import { useSelector } from '@cogoport/store';
import { doc, addDoc, getDoc, updateDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

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
	id,
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
		// const fileDetails = files?.[activeChat] || null;
		setDraftMessages((p) => ({ ...p, [id]: '' }));
		// setFiles({ ...files, [activeChat]: undefined });
		if (newMessage !== ''
		// || fileDetails
		) {
			const adminChat = {
				conversation_type : 'received',
				response          : { message: newMessage },
				created_at        : Date.now(),
				send_by           : user_name,
				session_type      : 'admin',
				// imgUrl:
				// 	fileDetails && fileDetails?.name.match(/\.(jpg|jpeg|png|gif|svg)$/i)
				// 		? fileDetails.url
				// 		: '',
				// pdfUrl:
				// 	fileDetails && fileDetails?.name?.includes('pdf')
				// 		? fileDetails.url
				// 		: '',
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

	// const { sendMessagesInfo, sendAPI } = useSendSupportChatMessages(
	// 	sendChatMessage,
	// 	getUser,
	// );

	// const sendWhatsappMessage = () => {
	// 	const newMessage = chatMessage?.[activeChat] || '';
	// 	if (differenceInDays(Date.now(), getUser.sent_updated_at) < 1) {
	// 		if (!isEmpty(newMessage?.trim()) && !sendAPI.loading) {
	// 			sendMessagesInfo('whatsapp', newMessage, getUser.user_id);
	// 		}
	// 	} else {
	// 		toast.error(
	// 			'Messages can only be sent within 24 hours of the last message sent by the user',
	// 		);
	// 	}
	// };

	return { sendChatMessage };
};

export default useSendChat;
