import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { getDoc } from 'firebase/firestore';

function useUpdateAssignedChat({ roomData = {}, onClose = () => {}, messageFireBaseDoc, setRoomData }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_assigned_chat',
		method : 'post',
	}, { manual: true });

	const { channel_type, id, user_details, user_id = null, lead_user_id = null } = roomData || {};
	let payload;

	if (channel_type === 'whatsapp') {
		payload = {
			user_id                 : user_details?.user_id || undefined,
			lead_user_id            : (!(user_details?.user_id) && lead_user_id) ? lead_user_id : undefined,
			whatsapp_number_eformat : user_id,
		};
	} else {
		payload = {
			user_id      : user_id || undefined,
			lead_user_id : (!(user_id) && lead_user_id) ? lead_user_id : undefined,

		};
	}

	const updateChat = async (data) => {
		try {
			await trigger({
				data: {
					channel         : channel_type,
					channel_chat_id : id,
					...payload,
					...data,
				},
			});
			Toast.success('updated sucessfully');
			onClose();
			setTimeout(async () => {
				const updatedDoc = await getDoc(messageFireBaseDoc);
				const updatedDocData = updatedDoc.data();
				setRoomData({ ...(updatedDocData || {}), id: updatedDoc?.id });
			}, 300);
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return {
		updateChat,
		loading,
	};
}

export default useUpdateAssignedChat;
