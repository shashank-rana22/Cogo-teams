import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useAssignChat({ closeModal = () => {}, activeMessageCard = {} }) {
	const { channel_type, id, user_id = null, lead_user_id = null, organization_id = null } = activeMessageCard || {};
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
