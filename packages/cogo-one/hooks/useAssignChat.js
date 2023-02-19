import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useAssignChat({ closeModal = () => {}, activeMessageCard = {}, formattedData = {} }) {
	const { user_id, lead_user_id, organization_id, mobile_no } = formattedData || {};
	const { channel_type, id } = activeMessageCard || {};
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_chat',
		method : 'post',
	}, { manual: true });

	const assignChat = async (payload) => {
		try {
			await trigger({
				data: {
					channel                 : channel_type,
					channel_chat_id         : id,
					user_id                 : user_id || undefined,
					lead_user_id            : (!(user_id) && lead_user_id) ? lead_user_id : undefined,
					whatsapp_number_eformat : mobile_no,
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
