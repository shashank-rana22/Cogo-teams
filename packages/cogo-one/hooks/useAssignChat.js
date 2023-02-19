import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { getDoc } from 'firebase/firestore';

function useAssignChat({ messageFireBaseDoc, setRoomData, roomData = {}, closeModal = () => {} }) {
	const { channel_type, id, user_id = null, lead_user_id = null, organization_id = null } = roomData || {};
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_chat',
		method : 'post',
	}, { manual: true });

	const assignChat = async (payload) => {
		try {
			await trigger({
				data: {
					channel         : channel_type,
					channel_chat_id : id,
					user_id         : user_id || undefined,
					lead_user_id    : (!(user_id) && lead_user_id) ? lead_user_id : undefined,
					organization_id,
					...payload,
				},
			});
			closeModal();
			setTimeout(async () => {
				const updatedDoc = await getDoc(messageFireBaseDoc);
				const updatedDocData = updatedDoc.data();
				setRoomData({ ...(updatedDocData || {}), id: updatedDoc?.id });
			}, 300);
			Toast.success('Successfully Assigned');
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return {
		assignChat,
		loading,
	};
}
export default useAssignChat;
