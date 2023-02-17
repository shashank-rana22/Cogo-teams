import { useSelector } from '@cogoport/store';
import { doc, addDoc, getDoc, updateDoc } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';
import getFileAttributes from '../utils/getFileAttributes';

const useSendChat = ({
	setDraftMessages,
	activeChatCollection,
	draftMessages,
	firestore,
	channel_type,
	draftUploadedFiles,
	setDraftUploadedFiles,
	id,
	setRoomData,
	// createCommunicationLoading,
	createWhatsappCommunication,
	formattedData,
}) => {
	const { user_name } = useSelector(({ profile }) => ({
		user_name: profile?.user?.name,
	}));

	let messageFireBaseDoc;
	if (id && channel_type) {
		messageFireBaseDoc = doc(
			firestore,
			`${FIRESTORE_PATH[channel_type]}/${id}`,
		);
	}

	const sendChatMessage = async () => {
		const newMessage = draftMessages?.[id] || '';
		const { finalUrl, fileType } = getFileAttributes({
			...draftUploadedFiles?.[id],
		});

		if (newMessage || finalUrl) {
			const adminChat = {
				conversation_type : 'received',
				response          : { message: newMessage },
				created_at        : Date.now(),
				send_by           : user_name,
				session_type      : 'admin',
				// imgUrl            : fileType === 'image' ? finalUrl : '',
				// pdfUrl            : fileType !== 'image' ? finalUrl : '',
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
			setDraftMessages((p) => ({ ...p, [id]: '' }));
			setDraftUploadedFiles((p) => ({ ...p, [id]: undefined }));
			setTimeout(() => {
				if (channel_type === 'whatsapp') {
					const {
						user_id = null,
						organization_id = null,
						mobile_number = '',
					} = formattedData || {};
					let message_metadata;
					if (finalUrl) {
						message_metadata = {
							message_type : finalUrl,
							caption      : newMessage,
							media_url    : finalUrl,
						};
					} else {
						message_metadata = {
							message_type : 'text',
							message      : newMessage,
						};
					}

					createWhatsappCommunication({
						recipient : mobile_number,
						message   : newMessage,
						user_id,
						organization_id,
						message_metadata,
					});
				}
			}, 200);
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

	return { sendChatMessage, updatetags, messageFireBaseDoc };
};

export default useSendChat;
