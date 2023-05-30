import { ShipmentDetailContext } from '@cogoport/context';
import { useState, useContext } from 'react';

import TaskCard from '../../../Tasks/TaskExecution';

import styles from './styles.module.css';

function Task({ showDoc = {}, setShowDoc = () => {}, refetch = () => {} }) {
	const [pendingTask, setPendingTask] = useState({});
	const { pendingItem = {} } = showDoc;

	const {
		shipment_data, primary_service,
		servicesList, getShipmentTimeline = () => {}, getShipment = () => {},
	} = useContext(ShipmentDetailContext);
	const handleClick = () => {
		setShowDoc(null);

		setPendingTask({
			...pendingTask,
			[pendingItem.id]: !pendingTask?.[pendingItem?.id],
		});
	};

	return (
		<div className={styles.container}>
			<TaskCard
				task={pendingItem}
				onCancel={() => handleClick(pendingItem)}
				taskListRefetch={refetch}
				shipment_data={shipment_data}
				getShipmentTimeline={getShipmentTimeline}
				getShipment={getShipment}
				primary_service={primary_service}
				servicesList={servicesList}
			/>
		</div>

	);
}

export default Task;
