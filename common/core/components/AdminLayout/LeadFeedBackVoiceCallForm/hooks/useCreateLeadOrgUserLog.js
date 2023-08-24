import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const LAST_INDEX = 1;

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

	const fieldArrAdditonalLeadUserIds = added_additional_contacts?.map(
		(eachVal) => eachVal?.field_additional_lead_user?.lead_user_id,
	);

	const additionalLeadUserids = [...new Set(
		[...(additional_lead_user_ids || []), ...(fieldArrAdditonalLeadUserIds || [])],
	)];

	const primaryContactsLastIndex = (added_primary_contacts || []).length - LAST_INDEX;

	return {
		lead_organization_id : leadOrgId,
		title,
		communication_response,
		communication_start_time,
		communication_end_time,
		agent_id,
		communication_summary,
		lead_user_id         : lead_user_id
		|| added_primary_contacts?.[primaryContactsLastIndex]?.field_primary_lead_user?.lead_user_id,
		additional_lead_user_ids : additionalLeadUserids,
		partner_id               : partnerId,
		communication_type       : 'call',
	};
};

function useCreateLeadOrgUserLog({ leadOrgId = '', partnerId = '', onCloseForm = () => {} }) {
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
			onCloseForm();
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
