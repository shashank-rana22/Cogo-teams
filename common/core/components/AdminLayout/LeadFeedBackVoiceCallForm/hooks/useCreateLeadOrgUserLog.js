import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ leadOrgId = '', values = {}, partnerId = '' }) => {
	const {
		title = '',
		communication_response = '',
		communication_start_time = '',
		communication_end_time = '',
		agent_id = '',
		communication_summary = '',
		lead_user_id = '',
		added_primary_contacts = [],
		added_additional_contacts = [],
		additional_lead_user_ids = [],
	} = values || {};

	const fieldArrAdditonalLeadUserIds = added_additional_contacts?.map((eachVal) => eachVal?.additional_lead_user_id);

	const additionalLeadUserids = [...new Set(
		[...(additional_lead_user_ids || []), ...(fieldArrAdditonalLeadUserIds || [])],
	)];

	return {
		lead_organization_id     : leadOrgId,
		title,
		communication_response,
		communication_start_time,
		communication_end_time,
		agent_id,
		communication_summary,
		lead_user_id             : added_primary_contacts?.pop() || lead_user_id,
		additional_lead_user_ids : additionalLeadUserids,
		partner_id               : partnerId,
	};
};

function useCreateLeadOrgUserLog({ leadOrgId = '', partnerId = '' }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_organization_communication_log',
		method : 'post',
	}, { manual: true });

	const createLeadOrgUserLog = async (values = {}) => {
		try {
			await trigger({
				data: getPayload({ leadOrgId, values, partnerId }),
			});
			Toast.success('Successfully Created');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		createLeadOrgUserLog,
		loading,
	};
}
export default useCreateLeadOrgUserLog;
