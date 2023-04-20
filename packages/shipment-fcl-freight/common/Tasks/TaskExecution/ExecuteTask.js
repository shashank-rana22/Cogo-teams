import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import { UploadBookingNote, UploadCargoArrival, UploadContainerDetails, MarkConfirmServices } from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

const excludeServices = [
	'fcl_freight_service',
	'haulage_freight_service',
];

function ExecuteTask({ task = {}, onCancel = () => {}, taskListRefetch = () => {}, services = [] }) {
	const { primary_service, shipment_data } = useContext(ShipmentDetailContext);

	const { taskConfigData, loading } = useGetTaskConfig({ task });

	const {
		steps,
		currentStep,
		setCurrentStep,
		primaryService,
	} = useTaskExecution({ task, taskConfigData });

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - 1]
		: {};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (
		task?.service_type
		&& task?.task === 'mark_confirmed'
		&& (!excludeServices.includes(task?.service_type))
	) {
		return (
			<MarkConfirmServices
				task={task}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
				primaryService={primaryService}
			/>
		);
	}

	if (
		task.task === 'upload_draft_bill_of_lading' && primaryService?.trade_type === 'export'
	) {
		return (
			<div>Draft bl flow for export</div>
		);
	}

	if (task.task === 'upload_booking_note') {
		return (
			<UploadBookingNote
				task={task}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
				taskConfigData={taskConfigData}
			/>
		);
	}

	if (
		task.task === 'update_container_details') {
		return (
			<UploadContainerDetails
				pendingTask={task}
				onCancel={onCancel}
				services={services}
				taskListRefetch={taskListRefetch}
			/>
		);
	}

	if (task.task === 'upload_container_arrival_notice') {
		return (
			<UploadCargoArrival
				pendingTask={task}
				summary={{
					...(primary_service || {}),
					importer_exporter_id: shipment_data?.importer_exporter?.id,
				}}
				refetch={taskListRefetch}
				clearTask={onCancel}
			/>
		);
	}

	if (task?.task === 'amend_draft_house_bill_of_lading') {
		return <div>Amend draft bl flow</div>;
	}

	return (
	// <div>
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			primaryService={primaryService}
			isLastStep={currentStep === steps.length - 1}
			currentStep={currentStep}
			setCurrentStep={setCurrentStep}
			getApisData={taskConfigData?.apis_data}
			uiConfig={taskConfigData?.task_config?.ui_config[currentStep]}
		/>
	// </div>
	);
}

export default ExecuteTask;
