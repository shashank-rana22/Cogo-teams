import { useState } from 'react';

import TaskCard from '../../../Tasks/TaskExecution';

function Task({ showDoc, setShowDoc, refetch }) {
	const [pendingTask, setPendingTask] = useState({});
	const { pendingItem = {} } = showDoc;

	// const { shipment_data, primary_Service } = useContext(ShipmentDetailContext);

	const handleClick = () => {
		setShowDoc(null);
		setPendingTask({
			...pendingTask,
			[pendingItem.id]: !pendingTask?.[pendingItem?.id],
		});
	};

	return (

		<TaskCard
			task={pendingItem}
			onCancel={() => handleClick(pendingItem)}
			refetch={refetch}
			type="modal"
		/>

	);
}
export default Task;
