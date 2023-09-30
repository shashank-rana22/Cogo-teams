import { useRequest } from '@cogoport/request';

const useBulkUpdateCommunication = () => {
	const [, triggerBulkCommunication] = useRequest({
		url    : '/bulk_update_communications',
		method : 'POST',
	}, { manual: true });

	return {
		triggerBulkCommunication,
	};
};
export default useBulkUpdateCommunication;
