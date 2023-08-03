import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useCreateCommunicationLog({ callEndAt = '', voice_call_recipient_data, unmountVoiceCall }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const {
		orgId = '',
		userId = '',
		loggedInAgentId = '',
		startTime = '',
	} = voice_call_recipient_data || {};

	const createCommunicationLog = async (extraPayload = {}) => {
		const payload = {
			communication_type       : 'call',
			is_reminder              : 'true',
			agent_id                 : loggedInAgentId,
			user_id                  : userId,
			organization_id          : orgId,
			partner_id               : partnerId,
			communication_start_time : startTime,
			communication_end_time   : callEndAt,
			...extraPayload,
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Saved Successfully');
			unmountVoiceCall();
		} catch (error) {
			Toast.error(getApiErrorString(error.data || 'something went wrong'));
		}
	};

	return {
		createCommunicationLog,
		loading,
	};
}

export default useCreateCommunicationLog;
