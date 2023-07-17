import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import getActiveCardDetails from '../utils/getActiveCardDetails';

function useSendUsersBulkCommunication({
	setSelectedAutoAssign = () => {},
	setAutoAssignChats = () => {}, callbackfunc = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_users_bulk_communication',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const bulkCommunicationChat = async ({ selectedAutoAssign = {}, variables = {}, template_name = '' }) => {
		const recipients = Object.values(selectedAutoAssign || {}).map((eachChat) => {
			const {	mobile_no = '' } = getActiveCardDetails(eachChat) || {};
			return mobile_no;
		});

		try {
			await trigger({
				data: {
					recipients,
					channel: 'whatsapp',
					template_name,
					variables,
				},
			});

			Toast.success('Successfully Template Send');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		} finally {
			setSelectedAutoAssign({});
			setAutoAssignChats(true);
			callbackfunc();
		}
	};
	return {
		bulkCommunicationChat,
		bulkCommunicationLoading: loading,
	};
}

export default useSendUsersBulkCommunication;
