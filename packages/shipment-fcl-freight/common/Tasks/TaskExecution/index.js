import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import AdditionsServicesTasks from './AdditionalServicesTasks';
import { ChooseServiceProvider, NominationTask } from './CustomTasks';
import ExecuteTask from './ExecuteTask';
import ReviewDoc from './ReviewDoc';

function TaskExecution({ task = {}, onCancel = () => {}, taskListRefetch = () => {} }) {
	// split the task on the basis of view here i.e, categorize the task into various categories
	// and make a view that hadles all the use cases

	const { servicesList, shipment_data, primary_service } = useContext(ShipmentDetailContext);

	if (task.task_type === 'approve_document') {
		return (
			<ReviewDoc
				task={task}
				onClose={onCancel}
				refetch={taskListRefetch}
			/>
		);
	}

	if (
		['add_quote_additional_service',
			'approve_quote_additional_service',
			'approve_amended_quote',
			'amend_quote_additional_service',
		].includes(task?.task_type)
	) {
		return (
			<AdditionsServicesTasks
				onCancel={onCancel}
				task={task}
				refetch={taskListRefetch}
			/>
		);
	}
	if (task.task === 'choose_service_provider') {
		return (
			<div>
				<ChooseServiceProvider
					only_select_rate
					task={task}
					onCancel={onCancel}
					refetch={taskListRefetch}
					// timeLineRefetch={timeLineRefetch}
					services={servicesList}
				/>
			</div>
		);
	}

	if (
		task.task === 'update_nomination_details'
	) {
		return (
			<NominationTask
				primary_service={primary_service}
				shipment_data={shipment_data}
				task={task}
				// stepConfig={stepConfigValue}
				onCancel={onCancel}
				refetch={taskListRefetch}
			/>
		);
	}

	return (
		<ExecuteTask task={task} onCancel={onCancel} taskListRefetch={taskListRefetch} />
	);
}

export default TaskExecution;
