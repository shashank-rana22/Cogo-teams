import { ShipmentDetailContext } from '@cogoport/context';
import { useSelector } from '@cogoport/store';
import { useContext, useState, useEffect } from 'react';

import useListShipmentPendingTasks from './useListShipmentPendingTasks';

const STAKEHOLDER_MAPPINGS = {
	booking_agent : 'booking_agent',
	booking_desk  : 'service_ops1',
	document_desk : 'service_ops2',
};

const useTask = ({ shipment_data = {}, isGettingShipment = false }) => {
	const { user_id } = useSelector(({ profile }) => ({ user_id: profile?.user?.id }));

	const { stakeholderConfig : { tasks = {} } = {}, activeStakeholder } = useContext(ShipmentDetailContext);

	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const [hideCompletedTasks, setHideCompletedTasks] = useState(false);
	const [showMyTasks, setShowMyTasks] = useState(!!tasks.checked_show_my_tasks);
	const [selectedMail, setSelectedMail] = useState([]);
	const [filters, setFilters] = useState({});

	const { data, loading, apiTrigger:taskListRefetch } = useListShipmentPendingTasks({
		defaultFilters : { shipment_id: shipment_data.id, shipment_type: 'air_freight' },
		defaultParams  : { page_limit: 100, sort_by: 'created_at', sort_type: 'asc' },
		filters,
	});

	let completedTaskCount = 0;

	(data?.list || []).forEach((task) => {
		completedTaskCount += task?.status === 'completed';
	});

	const tasksList = hideCompletedTasks
		? (data?.list || []).filter((task) => task.status === 'pending')
		: (data?.list || []);

	const handleClick = (task, newMails) => {
		if (newMails) {
			setSelectedMail(newMails);
		} else {
			setSelectedMail([]);
		}

		if ('id' in task) {
			setSelectedTaskId(task.id);
		}
	};
	useEffect(() => {
		if (!!tasks.is_task_assigned && showMyTasks) {
			setFilters({
				[`${STAKEHOLDER_MAPPINGS[activeStakeholder]}_id`] : user_id,
				show_stakeholder_all_task                         : STAKEHOLDER_MAPPINGS[activeStakeholder],
			});
		} else {
			setFilters({});
		}
	}, [showMyTasks, activeStakeholder, tasks.is_task_assigned, user_id]);

	return {
		showMyTasks,
		setShowMyTasks,
		selectedTaskId,
		setSelectedTaskId,
		hideCompletedTasks,
		setHideCompletedTasks,
		selectedMail,
		setSelectedMail,
		handleClick,
		loading : loading || isGettingShipment,
		count   : data?.total_count,
		tasksList,
		completedTaskCount,
		taskListRefetch,
	};
};

export default useTask;
