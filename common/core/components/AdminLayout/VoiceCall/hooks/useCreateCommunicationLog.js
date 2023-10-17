import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { updateRoom } from '../helpers/updateFireBase';

const getPayload = ({
	receiverUserDetails = {},
	extraPayload = {},
	partnerId = '',
	loggedInAgentId = '',
	callStartAt = '',
	callEndAt = '',
	callRecordId = '',
}) => {
	const { sid = '', communication_summary = '', title = '' } = extraPayload || {};
	const payload = { communication_summary, title };
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
		communication_service_id : callRecordId || undefined,
		communication_service    : callRecordId ? 'servetel' : undefined,
		feedback                 : sid ? [{
			feedback_data:
			[{ serial_id: sid }],
			feedback_type: 'shipment',
		}] : undefined,
		...(payload || {}),
	};
};

function useCreateCommunicationLog({
	receiverUserDetails = {},
	unmountVoiceCall,
	loggedInAgentId = '',
	callStartAt = '',
	callEndAt = '',
	callRecordId = '',
	firestore = {},
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
					callRecordId,
				}),
			});
			Toast.success('Saved Successfully');
			unmountVoiceCall();
			updateRoom({ firestore, agentId: loggedInAgentId });
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
