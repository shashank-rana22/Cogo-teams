/* eslint-disable no-plusplus */
import { useState, useEffect, useContext } from 'react';
import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import { getApiErrorString } from '@cogoport/front/utils';
import { useRouter } from '@cogo/next';
import isEmpty from '@cogo/utils/isEmpty';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { ShipmentDetailContext } from '../../commons/Context';

const stakeHoldersArr = [
	'booking_agent',
	'service_ops1',
	'service_ops2',
	'service_ops3',
];

const useGetPendingTasks = ({
	taskId = '',
	isChildShipment = false,
	childShipmentId = '',
}) => {
	const [pendingTask, setPendingTask] = useState(
		taskId ? { [taskId]: true } : null,
	);
	const [showCompletedTask, setShowCompletedTask] = useState(false);
	const [showMyTasks, setMyTasks] = useState(true);
	const [selectedMail, setSelectedMail] = useState([]);
	const [showTaskFilters, setShowTaskFilters] = useState({});

	const [{ shipment_data, primary_service, isGettingShipment }] = useContext(
		ShipmentDetailContext,
	);

	const scope = useSelector(({ general }) => general.scope);

	const router = useRouter();
	const { user_id: userId } = useSelector(({ profile }) => ({
		user_id: profile.id,
	}));

	const query_task = router.query?.task;
	const shipment_id = router.query?.id;

	const { trigger, data, loading } = useRequest(
		'get',
		false,
		scope,
	)('/list_shipment_pending_tasks');

	const refetch = async () => {
		try {
			const res = await trigger({
				params: {
					page_limit: 100,
					sort_type: 'asc',
					filters: {
						shipment_id: isChildShipment ? childShipmentId : shipment_id,
						shipment_type: shipment_data?.shipment_type,
						...(showMyTasks ? showTaskFilters : {}),
					},
				},
			});
			if (res.hasError) {
				toast.error(getApiErrorString(res?.messages));
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleClick = (task, newMails) => {
		if (newMails) {
			setSelectedMail(newMails);
		} else {
			setSelectedMail([]);
		}
		if (Object.keys(pendingTask || {})?.[0]) {
			setPendingTask(null);
		} else {
			setPendingTask({ [task.id]: !pendingTask?.[task.id] });
		}
	};

	useEffect(() => {
		let stakeholder_types = [];
		let count = 0;
		(shipment_data?.stakeholder_types || []).forEach((val) => {
			if (['entity_manager', 'booking_agent'].includes(val)) {
				count += 1;
			}
		});

		if (count === 2) {
			(shipment_data?.stakeholder_types || []).forEach((val) => {
				if (val !== 'entity_manager') {
					stakeholder_types.push(val);
				}
			});
		} else {
			stakeholder_types = shipment_data?.stakeholder_types || [];
		}

		if (
			shipment_data?.entity_id === GLOBAL_CONSTANTS.country_entity_ids.VN &&
			showMyTasks
		) {
			if (!isEmpty(stakeholder_types)) {
				setShowTaskFilters({ stakeholder_id: userId });
			}
		} else if (showMyTasks) {
			(stakeholder_types || []).forEach((val) => {
				setShowTaskFilters({
					[`${val}_id`]: userId,
					show_stakeholders_all_task: stakeHoldersArr.includes(val)
						? val
						: undefined,
				});
			});
		}
		refetch();
	}, [showMyTasks, shipment_data?.id, JSON.stringify(showTaskFilters)]);

	let completed_count = 0;
	(data?.list || []).forEach((obj) => {
		completed_count += obj.status === 'completed';
	});

	const tasksToShow = showCompletedTask
		? (data?.list || []).filter((obj) => obj.status !== 'completed')
		: data?.list || [];

	const focusTask = tasksToShow.find((obj) => obj.task === query_task);

	useEffect(() => {
		if (focusTask?.task) {
			// auto open a task if task is there in query params
			handleClick(focusTask);
		}
	}, [focusTask?.task]);

	return {
		loading: loading || isGettingShipment,
		count: data?.total_count || 0,
		refetch,
		showCompletedTask,
		setShowCompletedTask,
		showMyTasks,
		setMyTasks,
		handleClick,
		pendingTask,
		setPendingTask,
		completed_count,
		tasksToShow,
		primary_service,
		tasks: data?.list || [],
		shipment_data: shipment_data || {},
		selectedMail,
		setSelectedMail,
	};
};

export default useGetPendingTasks;
