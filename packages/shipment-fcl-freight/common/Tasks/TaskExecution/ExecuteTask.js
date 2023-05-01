import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';
import useTaskRpa from '../../../hooks/useTaskRpa';

import {
	UploadBookingNote,
	UploadCargoArrival,
	UploadContainerDetails,
	MarkConfirmServices,
	NominationTask,
	GenerateFreightCertificate,
	ChooseServiceProvider,
	UploadDraftBL,
} from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

const excludeServices = [
	'fcl_freight_service',
	'haulage_freight_service',
];

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	setSelectedMail = () => {},
}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });
	const { mailLoading = true } = useTaskRpa({ setSelectedMail, task });

	const { servicesList, shipment_data, primary_service } = useContext(ShipmentDetailContext);

	console.log('sererferf', servicesList, shipment_data, primary_service);
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

	if (
		task.service_type
		&& task.task === 'mark_confirmed'
		&& (!excludeServices.includes(task.service_type))
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

	if (
		task.task === 'upload_draft_bill_of_lading' && primary_service?.trade_type === 'export'
	) {
		return (
			<UploadDraftBL
				task={task}
				shipmentData={shipment_data}
				primaryService={primary_service}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
				servicesList={servicesList}
			/>
		);
	}

	if (task.task === 'upload_booking_note') {
		if (mailLoading) {
			return <div>Loading...</div>;
		}

		return (
			<UploadBookingNote
				task={task}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
			/>
		);
	}

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
