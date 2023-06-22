import useListShipmentServices from '../../../hooks/useListShipmentServices';

import AdditionsServicesTasks from './AdditionalServicesTasks';
import ExecuteTask from './ExecuteTask';
import ReviewDoc from './ReviewDoc';
import UploadAmendDoc from './UploadAmendDoc';

function TaskExecution({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	setSelectedMail = () => {},
	shipment_data = {},
	primary_service = {},
	getShipmentTimeline = () => {},
	getShipment = () => {},
}) {
	const services = useListShipmentServices({
		defaultFilters: {
			shipment_id: shipment_data?.id,
		},
	});

	if (task?.task_type === 'amend_document') {
		return (
			<UploadAmendDoc
				task={task}
				onClose={onCancel}
				refetch={taskListRefetch}
			/>
		);
	}

	switch (task?.task_type) {
		case 'approve_document':
			return (
				<ReviewDoc
					task={task}
					onClose={onCancel}
					refetch={taskListRefetch}
				/>
			);

		case 'add_quote_additional_service':
		case 'approve_quote_additional_service':
		case 'approve_amended_quote':
		case 'amend_quote_additional_service':
			return (
				<AdditionsServicesTasks
					onCancel={onCancel}
					task={task}
					refetch={taskListRefetch}
					shipment_data={shipment_data}
				/>
			);

		default:
			return (
				<ExecuteTask
					task={task}
					onCancel={onCancel}
					taskListRefetch={taskListRefetch}
					selectedMail={selectedMail}
					setSelectedMail={setSelectedMail}
					services={services?.servicesList}
					shipment_data={shipment_data}
					primary_service={primary_service}
					getShipmentTimeline={getShipmentTimeline}
					getShipment={getShipment}
				/>
			);
	}
}

export default TaskExecution;