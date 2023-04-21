import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import {
	UploadBookingNote, UploadCargoArrival, UploadContainerDetails,
	MarkConfirmServices, NominationTask, GenerateFreightCertificate, ChooseServiceProvider,
} from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

const excludeServices = [
	'fcl_freight_service',
	'haulage_freight_service',
];

function ExecuteTask({ task = {}, onCancel = () => {}, taskListRefetch = () => {}, services = [] }) {
	const { taskConfigData, loading } = useGetTaskConfig({ task });

	const { servicesList, shipment_data, primary_service } = useContext(ShipmentDetailContext);

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
	);
}

export default ExecuteTask;
