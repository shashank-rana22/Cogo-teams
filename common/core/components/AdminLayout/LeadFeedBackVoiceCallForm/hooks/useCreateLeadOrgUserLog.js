import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ leadOrgId = '', values = {}, partnerId = '', callRecordId = '' }) => {
	const {
		title = '',
		communication_response = '',
		communication_start_time = '',
		communication_end_time = '',
		agent_id = '',
		communication_summary = '',
		lead_user_id = '',
		additional_lead_user_ids = [],
	} = values || {};

	return {
		lead_organization_id     : leadOrgId,
		title,
		communication_response,
		communication_start_time,
		communication_end_time,
		agent_id,
		communication_summary,
		lead_user_id,
		additional_lead_user_ids,
		partner_id               : partnerId,
		communication_type       : 'call',
		communication_service_id : callRecordId || undefined,
		communication_service    : callRecordId ? 'servetel' : undefined,
	};
};

function useCreateLeadOrgUserLog({ leadOrgId = '', partnerId = '', onCloseForm = () => {}, callRecordId = '' }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const createLeadOrgUserLog = async (values = {}) => {
		try {
			await trigger({
				data: getPayload({ leadOrgId, values, partnerId, callRecordId }),
			});
			Toast.success('Successfully Created');
			onCloseForm({ isSubmitSucessFull: true });
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'something went wrong');
		}
	};

	return {
		createLeadOrgUserLog,
		loading,
	};
}
export default useCreateLeadOrgUserLog;
