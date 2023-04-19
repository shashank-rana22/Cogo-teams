import { ShipmentDetailContext } from '@cogoport/context';
import React, { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import { UploadBookingNote, UploadCargoArrival, UploadContainerDetails } from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

function ExecuteTask({ task = {}, onCancel = () => {}, taskListRefetch = () => {} }) {
	const { primary_service, shipment_data } = useContext(ShipmentDetailContext);

	const { taskConfigData, loading } = useGetTaskConfig({ task, onCancel });

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
