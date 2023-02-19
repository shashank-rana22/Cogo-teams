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
	sendMessage,
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
		const { finalUrl = '', fileType = '' } = getFileAttributes({
			...draftUploadedFiles?.[id],
		});

		setDraftMessages((p) => ({ ...p, [id]: '' }));
		setDraftUploadedFiles((p) => ({ ...p, [id]: undefined }));

		if (newMessage || finalUrl) {
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

			await addDoc(activeChatCollection, adminChat);

			const doc1 = await getDoc(messageFireBaseDoc);
			const old_count = doc1.data().new_message_count_user;
			await updateDoc(messageFireBaseDoc, {
				new_message_count      : 0,
				last_message           : newMessage,
				updated_at             : Date.now(),
				new_message_count_user : old_count + 1,
			});
			setTimeout(() => {
				const {
					user_id = null,
					organization_id = null,
					mobile_no = '',
					lead_user_id = null,
				} = formattedData || {};
				let message_metadata;
				if (finalUrl) {
					message_metadata = {
						message_type : fileType,
						caption      : newMessage,
						media_url    : finalUrl,
					};
				} else {
					message_metadata = {
						message_type : 'text',
						text         : newMessage,
					};
				}

				sendMessage({
					recipient : mobile_no,
					message   : newMessage,
					user_id,
					organization_id,
					message_metadata,
					lead_user_id,
				});
			}, 300);
		}
	};

	const sentQuickSuggestions = async (val, scrollBottom) => {
		const adminChat = {
			conversation_type : 'received',
			message_type      : 'text',
			response          : { message: val },
			created_at        : Date.now(),
			send_by           : user_name,
			session_type      : 'admin',

		};
		await addDoc(activeChatCollection, adminChat);
		scrollBottom();
		const doc1 = await getDoc(messageFireBaseDoc);
		const old_count = doc1.data().new_message_count_user;
		await updateDoc(messageFireBaseDoc, {
			new_message_count      : 0,
			last_message           : val,
			updated_at             : Date.now(),
			new_message_count_user : old_count + 1,
		});
		setTimeout(() => {
			const {
				user_id = null,
				organization_id = null,
				mobile_no = '',
				lead_user_id = null,
			} = formattedData || {};
			sendMessage({
				recipient        : mobile_no,
				user_id,
				organization_id,
				lead_user_id,
				message_metadata : {
					message_type : 'text',
					message      : val,
				},
			});
		}, 200);
	};
	return { sendChatMessage, messageFireBaseDoc, sentQuickSuggestions };
};

export default useSendChat;
