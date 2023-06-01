import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';
// import useTaskRpa from '../../../hooks/useTaskRpa';

import {
	// UploadBookingNote,
	// UploadCargoArrival,
	UploadContainerDetails,
	MarkConfirmServices,
	CustomerInvoiceDetails,
	ApproveTruck,
} from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	setSelectedMail = () => {},
}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });
	// const { mailLoading = true } = useTaskRpa({ setSelectedMail, task });

	const { servicesList, shipment_data, primary_service, getShipmentTimeline } = useContext(ShipmentDetailContext);

	const {
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - 1]
		: {};

	if (loading) {
		return <div>Loading...</div>;
	}
	if (task.task === 'update_customer_invoice_details') {
		return (
			<CustomerInvoiceDetails
				onCancel={onCancel}
				servicesList={servicesList}
				shipment_data={shipment_data}
				task={task}
				refetch={taskListRefetch}
				getShipmentTimeline={getShipmentTimeline}
			/>
		);
	}

	if (
		task.service_type
		&& task.task === 'mark_confirmed'
	) {
		return (
			<MarkConfirmServices
				task={task}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
				primaryService={primary_service}
				shipment_data={shipment_data}
				servicesList={servicesList}
			/>
		);
	}

	// if (task.task === 'upload_booking_note') {
	// 	if (mailLoading) {
	// 		return <div>Loading...</div>;
	// 	}

	// 	return (
	// 		<UploadBookingNote
	// 			task={task}
	// 			onCancel={onCancel}
	// 			taskListRefetch={taskListRefetch}
	// 		/>
	// 	);
	// }

	if (
		task.task === 'update_container_details') {
		return (
			<UploadContainerDetails
				pendingTask={task}
				onCancel={onCancel}
				services={servicesList}
				taskListRefetch={taskListRefetch}
			/>
		);
	}

	if (['approve_additional_truck', 'approve_updated_truck'].includes(task?.task)) {
		return (
			<ApproveTruck
				onCancel={onCancel}
				services={servicesList}
				shipment_data={shipment_data}
				task={task}
				timeLineRefetch={getShipmentTimeline}
				taskListRefetch={taskListRefetch}
			/>
		);
	}

	// if (task.task === 'upload_container_arrival_notice') {
	// 	return (
	// 		<UploadCargoArrival
	// 			pendingTask={task}
	// 			summary={{
	// 				...(primary_service || {}),
	// 				importer_exporter_id: shipment_data?.importer_exporter?.id,
	// 			}}
	// 			refetch={taskListRefetch}
	// 			clearTask={onCancel}
	// 		/>
	// 	);
	// }

	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			isLastStep={currentStep === steps.length - 1}
			currentStep={currentStep}
			setCurrentStep={setCurrentStep}
			getApisData={taskConfigData?.apis_data}
			uiConfig={taskConfigData?.task_config?.ui_config[currentStep]}
			selectedMail={selectedMail}
			serviceIdMapping={serviceIdMapping}
		/>
	);
}

export default ExecuteTask;
