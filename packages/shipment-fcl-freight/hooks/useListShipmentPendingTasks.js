import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext, useState, useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

function useListShipmentPendingTasks() {
	const [hideCompletedTasks, setHideCompletedTasks] = useState(false);
	const [showMyTasks, setShowMyTasks] = useState(false);

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
					Toast.error((getApiErrorString(error)));
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

	console.log('shipment data', data);
	return {
		loading      : loading || isGettingShipment,
		count        : data?.total_count,
		tasksList,
		shipmentData : shipment_data,
		completedTaskCount,
		setHideCompletedTasks,
		showMyTasks,
		setShowMyTasks,
	};
}
export default useListShipmentPendingTasks;
