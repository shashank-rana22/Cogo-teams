import { ShipmentDetailContext } from '@cogoport/context';
// import TaskCard from '@cogo/bookings/PerformPendingTasks/components/Task';
import { useState, useContext } from 'react';

function Task({ show, setShow, refetch }) {
	const [pendingTask, setPendingTask] = useState({});

	const { pendingItem = {}, url = '', document_url = '' } = show;

	const [{ shipment_data, primary_service }] = useContext(
		ShipmentDetailContext,
	);
	const handleClick = () => {
		setShow(null);
		setPendingTask({
			...pendingTask,
			[pendingItem.id]: !pendingTask?.[pendingItem?.id],
		});
	};
	let selectedMail = {
		formatted: [
			{
				url: url || document_url,
			},
		],
	};

	if (pendingItem.task === 'upload_booking_note') {
		selectedMail = {
			formatted: {
				fileUrls: [
					{
						url  : url || document_url,
						name : url || document_url,
					},
				],
			},
		};
	}

	return (
		// <TaskCard
		// 	task={pendingItem}
		// 	onCancel={() => handleClick(pendingItem)}
		// 	refetch={refetch}
		// 	shipment_data={shipment_data}
		// 	primary_service={primary_service}
		// 	services={shipment_data?.all_services}
		// 	type="modal"
		// 	selectedMail={selectedMail}
		// />
		<div>gvhfjekd</div>
	);
}

export default Task;
