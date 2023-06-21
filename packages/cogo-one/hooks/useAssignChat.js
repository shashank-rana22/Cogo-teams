import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useAssignChat({
	closeModal = () => {},
	activeMessageCard = {},
	formattedData = {},
	canMessageOnBotSession = false,

}) {
	const { user_id, lead_user_id, organization_id, mobile_no, sender = null, cogo_entity_id } = formattedData || {};
	const { channel_type, id } = activeMessageCard || {};
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_chat',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const assignChat = async ({ payload, callBackFunc = () => {} }) => {
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
					cogo_entity_id          : cogo_entity_id || undefined,
					...payload,

				},
			});

			if (!canMessageOnBotSession) {
				closeModal();
				Toast.success('Successfully Assigned');
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		} finally {
			callBackFunc();
		}
	};

	return {
		assignChat,
		loading,
	};
}
export default useAssignChat;
