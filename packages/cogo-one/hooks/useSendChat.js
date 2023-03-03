import { Toast } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
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
	const isGreaterThan24hours = (newMessageSentAt) => {
		const lastMessageTime = new Date(newMessageSentAt);
		const currentTime = new Date();
		const hoursDifference = Math.abs(currentTime - lastMessageTime) / 36e5;
		return hoursDifference >= 24 && channel_type === 'whatsapp';
	};
	const sendChatMessage = async () => {
		const newMessage = draftMessages?.[id]?.trim() || '';

		const urlArray = decodeURI(draftUploadedFiles?.[id])?.split('/');
		const fileName = urlArray[(urlArray?.length || 0) - 1] || '';
		const { finalUrl = '', fileType = '' } = getFileAttributes({
			finalUrl: draftUploadedFiles?.[id], fileName,
		});

		setDraftMessages((p) => ({ ...p, [id]: '' }));
		setDraftUploadedFiles((p) => ({ ...p, [id]: undefined }));
		const document = await getDoc(messageFireBaseDoc);
		if (isGreaterThan24hours(document?.data()?.new_message_sent_at)) {
			Toast.error('Message cannot be sent after 24 hours.Try sending a Template Instead');
			return;
		}
		if (!isEmpty(newMessage?.trim()) || finalUrl) {
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
			const old_count = document.data().new_user_message_count;
			await updateDoc(messageFireBaseDoc, {
				new_message_count      : 0,
				last_message           : newMessage,
				new_message_sent_at    : Date.now(),
				new_user_message_count : old_count + 1,
			});
			setTimeout(() => {
				const {
					user_id = null,
					organization_id = null,
					mobile_no = '',
					lead_user_id = null,
					sender = null,
				} = formattedData || {};
				let messageMetadata;
				if (finalUrl) {
					messageMetadata = {
						message_type : fileType,
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

				});
			}, 500);
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
		const old_count = doc1.data().new_user_message_count;
		await updateDoc(messageFireBaseDoc, {
			new_message_count      : 0,
			last_message           : val,
			new_message_sent_at    : Date.now(),
			new_user_message_count : old_count + 1,
		});
		setTimeout(() => {
			const {
				user_id = null,
				organization_id = null,
				mobile_no = '',
				lead_user_id = null,
				sender = null,
			} = formattedData || {};
			sendMessage({
				recipient        : mobile_no || sender,
				user_id,
				organization_id,
				lead_user_id,
				message_metadata : {
					message_type : 'text',
					text         : val,
					session_type : 'admin',
				},
			});
		}, 500);
	};

	return { sendChatMessage, messageFireBaseDoc, sentQuickSuggestions };
};

export default useSendChat;
