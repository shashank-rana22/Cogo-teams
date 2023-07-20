import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const DEFAULT_PAGE_LIMIT = 20;
const DEFAULT_SORT_TYPE = 'asc';

const useGetPendingTasks = ({ shipment_data = {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_pending_tasks',
		method : 'GET',
	}, { manual: true });

	const getPendingTasks = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id   : shipment_data?.id,
						shipment_type : shipment_data?.shipment_type,
					},
					page_limit : DEFAULT_PAGE_LIMIT,
					sort_type  : DEFAULT_SORT_TYPE,
				},
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, shipment_data]);

	useEffect(() => {
		getPendingTasks();
	}, [getPendingTasks]);

	return {
		data,
		loading,
		getPendingTasks,
	};
};

export default useGetPendingTasks;
