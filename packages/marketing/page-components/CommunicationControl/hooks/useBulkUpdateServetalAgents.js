import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useBulkUpdateServetalAgents = () => {
	const [{ loading }, trigger] = useRequest({
		url    : './bulk_update_servetel_agent',
		method : 'POST',
	}, { manual: true });

	const bulkUpdateAgents = async ({
		setDeleteAgentsModal = () => {},
		listServetalAgent = () => {},
		payload = {},
	}) => {
		try {
			await trigger({
				data: payload,
			});
			setDeleteAgentsModal(false);
			listServetalAgent();
			Toast.success('Successfully Deleted');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		deleteLoading: loading,
		bulkUpdateAgents,
	};
};

export default useBulkUpdateServetalAgents;
