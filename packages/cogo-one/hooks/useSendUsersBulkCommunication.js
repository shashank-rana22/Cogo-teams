import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import getActiveCardDetails from '../utils/getActiveCardDetails';

const getPayload = ({ selectedAutoAssign = {}, variables = {}, template_name = '' }) => {
	const recipients = Object.values(selectedAutoAssign || {}).map(
		(eachChat) => {
			const { mobile_no = '' } = getActiveCardDetails(eachChat) || {};
			return mobile_no;
		},
	);

	return {
		recipients,
		channel     : 'whatsapp',
		template_name,
		variables,
		assign_chat : false,
	};
};

function useSendUsersBulkCommunication({
	setSelectedAutoAssign = () => {},
	setAutoAssignChats = () => {},
	setSendBulkTemplates = () => {},
	setModalType = () => {},
	setSelectedUsers = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_users_bulk_communication',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const bulkCommunicationChat = async ({ selectedAutoAssign = {}, variables = {}, template_name = '' }) => {
		try {
			await trigger({ data: getPayload({ selectedAutoAssign, variables, template_name }) });

			Toast.success('Successfully Template Send');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		} finally {
			setSelectedAutoAssign({});
			setAutoAssignChats(true);
			setSendBulkTemplates(false);
			setModalType('');
			setSelectedUsers({});
		}
	};
	return {
		bulkCommunicationChat,
		bulkCommunicationLoading: loading,
	};
}

export default useSendUsersBulkCommunication;
