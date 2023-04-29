import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateAssignedChat({ activeMessageCard = {}, onClose = () => {}, formattedData }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_assigned_chat',
		method : 'post',
	}, { manual: true });
	const {
		user_id = null,
		mobile_no = '',
		lead_user_id = null,
		organization_id = null,
		sender = null,
	} = formattedData || {};
	const { channel_type, id } = activeMessageCard || {};

	const updateChat = async (data) => {
		try {
			await trigger({
				data: {
					channel                 : channel_type,
					channel_chat_id         : id,
					user_id                 : user_id || undefined,
					lead_user_id            : (!(user_id) && lead_user_id) ? lead_user_id : undefined,
					whatsapp_number_eformat : channel_type === 'whatsapp' ? mobile_no : undefined,
					organization_id,
					sender,
					...data,
				},
			});
			Toast.success('updated sucessfully');
			onClose();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		updateChat,
		loading,
	};
}

export default useUpdateAssignedChat;
