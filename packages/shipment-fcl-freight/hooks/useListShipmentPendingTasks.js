import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext, useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

function useListShipmentPendingTasks() {
	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const [hideCompletedTasks, setHideCompletedTasks] = useState(false);
	const [showMyTasks, setShowMyTasks] = useState(true);

	const { shipment_data, isGettingShipment } = useContext(ShipmentDetailContext);
	const { id: shipment_id } = shipment_data || '';

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_pending_tasks',
		method : 'GET',
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(
			async () => {
				try {
					await trigger({
						params: {
							filters: {
								shipment_id,
								shipment_type: 'fcl_freight',
							},
							sort_type  : 'asc',
							page_limit : 100,
						},
					});
				} catch (error) {
					toastApiError(error);
				}
			}
		)();
	}, [shipment_id, trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	let completedTaskCount = 0;
	(data?.list || []).forEach((task) => {
		completedTaskCount += task?.status === 'completed';
	});

	const tasksList = hideCompletedTasks
		? (data?.list || []).filter((task) => task.status === 'pending')
		: (data?.list || []);

	const handleClick = (task) => {
		if (Object.keys(task).includes('id')) {
			setSelectedTaskId(task.id);
		}
	};

	return {
		loading : loading || isGettingShipment,
		count   : data?.total_count,
		tasksList,
		completedTaskCount,
		shipment_data,
		hideCompletedTasks,
		setHideCompletedTasks,
		handleClick,
		setSelectedTaskId,
		selectedTaskId,
		showMyTasks,
		setShowMyTasks,
	};
}
export default useListShipmentPendingTasks;
