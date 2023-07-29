import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const AGENT_TYPE_MAPPING = {
	service_provider  : 'supply',
	importer_exporter : 'support',
};

const getPayload = ({ formattedData, payload }) => {
	const {
		user_id, lead_user_id,
		organization_id,
		mobile_no,
		sender = null,
		cogo_entity_id,
		channel_type, id,
		account_type = '',
		lead_user_details = {},
	} = formattedData || {};

	const { lead_organization_id = '' } = lead_user_details || {};

	return {
		channel                 : channel_type,
		channel_chat_id         : id,
		user_id                 : user_id || undefined,
		lead_user_id            : (!(user_id) && lead_user_id) ? lead_user_id : undefined,
		whatsapp_number_eformat : mobile_no,
		organization_id,
		sender,
		cogo_entity_id          : cogo_entity_id || undefined,
		agent_type              : AGENT_TYPE_MAPPING[account_type] || AGENT_TYPE_MAPPING.importer_exporter,
		lead_organization_id,
		...payload,
	};
};

function useAssignChat({
	closeModal = () => {},
	formattedData = {},
	canMessageOnBotSession = false,

}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_chat',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const assignChat = async ({ payload, callBackFunc = () => {} }) => {
		try {
			await trigger({
				data: getPayload({ formattedData, payload }),
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
