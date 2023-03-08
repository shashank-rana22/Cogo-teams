import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useAssignChat({
	closeModal = () => {},
	activeMessageCard = {},
	formattedData = {},
	setDisableButton = () => {},
}) {
	const { user_id, lead_user_id, organization_id, mobile_no, sender = null } = formattedData || {};
	const { channel_type, id } = activeMessageCard || {};
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_chat',
		method : 'post',
	}, { manual: true, autoCancel: false });

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
					sender,
					...payload,

				},
			});
			closeModal();
			setDisableButton('');
			Toast.success('Successfully Assigned');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};
	return {
		assignChat,
		loading,
	};
}
export default useAssignChat;
