import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useClaimChat({ userId }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_chat',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const claimChat = async (payload) => {
		const { user_id, lead_user_id, organization_id, mobile_no, sender = null, channel_type, id } = payload || {};
		try {
			await trigger({
				data: {
					channel                 : channel_type,
					channel_chat_id         : id,
					user_id,
					lead_user_id,
					whatsapp_number_eformat : mobile_no,
					organization_id,
					sender,
					agent_id                : userId,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};
	return {
		claimChat,
		claimLoading: loading,
	};
}
export default useClaimChat;
