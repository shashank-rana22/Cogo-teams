import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { getDoc } from 'firebase/firestore';

function useUpdateAssignedChat({ roomData = {}, onClose = () => {}, messageFireBaseDoc, setRoomData }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_assigned_chat',
		method : 'post',
	}, { manual: true });

	const { channel_type, id, user_id = null, mobile_no = '', lead_user_id = null } = roomData || {};

	const updateChat = async (data) => {
		try {
			await trigger({
				data: {
					channel                 : channel_type,
					channel_chat_id         : id,
					user_id                 : user_id || undefined,
					lead_user_id            : (!(user_id) && lead_user_id) ? lead_user_id : undefined,
					whatsapp_number_eformat : channel_type === 'whatsapp' ? mobile_no : undefined,
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
