import { ShipmentDetailContext } from '@cogoport/context';
import { useContext, useState } from 'react';

import useListTasks from '../../hooks/useListTasks';

function useListTasksHelper() {
	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const [hideCompletedTasks, setHideCompletedTasks] = useState(false);
	const [showMyTasks, setShowMyTasks] = useState(true);
	const [filters] = useState({});

	const { shipment_data, isGettingShipment } = useContext(ShipmentDetailContext);
	const { id: shipment_id } = shipment_data || '';

	const { list, refetch:taskListRefetch, loading } = useListTasks({
		defaultParams  : { page_limit: 100, sort_by: 'asc' },
		defaultFilters : { shipment_id },
		filters,
	});

	let completedTaskCount = 0;
	(list?.list || []).forEach((task) => {
		completedTaskCount += task?.status === 'completed';
	});

	const tasksList = hideCompletedTasks
		? (list?.list || []).filter((task) => task.status === 'pending')
		: (list?.list || []);

	const handleClick = (task) => {
		if ('id' in task) {
			setSelectedTaskId(task.id);
		}
	};

	// console.log('setFilters', setFilters);

	return {
		loading : loading || isGettingShipment,
		count   : list?.list?.length,
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
		taskListRefetch,
	};
}
export default useListTasksHelper;
