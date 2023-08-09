import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getPayload = ({
	receiverUserDetails = {},
	extraPayload = {},
	partnerId = '',
	loggedInAgentId = '',
	callStartAt = '',
	callEndAt = '',
}) => {
	const {
		organization_id = '',
		user_id = '',
	} = receiverUserDetails || {};

	return {
		communication_type       : 'call',
		is_reminder              : 'true',
		agent_id                 : loggedInAgentId,
		user_id,
		organization_id,
		partner_id               : partnerId,
		communication_start_time : new Date(callStartAt),
		communication_end_time   : callEndAt,
		...(extraPayload || {}),
	};
};

function useCreateCommunicationLog({
	receiverUserDetails = {},
	unmountVoiceCall,
	loggedInAgentId = '',
	callStartAt = '',
	callEndAt = '',
}) {
	const partnerId = useSelector((state) => state?.profile?.partner?.id);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const createCommunicationLog = async (extraPayload = {}) => {
		try {
			await trigger({
				data: getPayload({
					receiverUserDetails,
					extraPayload,
					partnerId,
					loggedInAgentId,
					callStartAt,
					callEndAt,
				}),
			});
			Toast.success('Saved Successfully');
			unmountVoiceCall();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'something went wrong');
		}
	};

	return {
		createCommunicationLog,
		loading,
	};
}

export default useCreateCommunicationLog;
