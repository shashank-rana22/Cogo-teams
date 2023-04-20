import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import AdditionsServicesTasks from './AdditionalServicesTasks';
import { ChooseServiceProvider, NominationTask, GenerateFreightCertificate } from './CustomTasks';
import ExecuteTask from './ExecuteTask';
import ReviewDoc from './ReviewDoc';
import UploadAmendDoc from './UploadAmendDoc';

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

	if (task.task_type === 'amend_document' && task.task !== 'amend_draft_house_bill_of_lading') {
		return (
			<UploadAmendDoc
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
					task={task}
					onCancel={onCancel}
					refetch={taskListRefetch}
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
				primaryService={primary_service}
				shipmentData={shipment_data}
				task={task}
				onCancel={onCancel}
				refetch={taskListRefetch}
			/>
		);
	}

	if (task.task === 'generate_freight_certificate') {
		return (
			<GenerateFreightCertificate
				task={task}
				refetch={taskListRefetch}
				onCancel={onCancel}
			/>
		);
	}

	return (
		<ExecuteTask task={task} onCancel={onCancel} taskListRefetch={taskListRefetch} />
	);
}

export default TaskExecution;
