import useGetTaskConfig from '../../../hooks/useGetTaskConfig';
import LoadingState from '../LoadingState';

import {
	UploadCargoArrival,
	MarkConfirmServices,
	UploadDraftBL,
} from './CustomTasks';
import CargoInsurance from './CustomTasks/CargoInsurance';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	// setSelectedMail = () => {},
	services = [],
	shipment_data = {},
	primary_service = {},
	getShipment = () => {},
	getShipmentTimeline = () => {},

}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });
	// const { mailLoading = true } = useTaskRpa({ setSelectedMail, task });
	const STEPS_LENGTH = 1;

	const {
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData, servicesList: services, primaryService: primary_service });

	const stepConfigValue = steps.length ? steps[currentStep] || steps[steps.length - STEPS_LENGTH] : {};

	if (loading) {
		return <div><LoadingState /></div>;
	}

	if (task?.task === 'mark_confirmed' && 	task?.service_type) {
		return (
			<MarkConfirmServices
				task={task}
				onCancel={onCancel}
				refetch={taskListRefetch}
				primaryService={primary_service}
				shipment_data={shipment_data}
				servicesList={services}
			/>
		);
	}

	if (task?.task === 'amend_draft_house_bill_of_lading') {
		return <div>Amend draft bl flow</div>;
	}

	if (task.task === 'upload_draft_bill_of_lading' && primary_service?.trade_type === 'export') {
		return (
			<UploadDraftBL
				task={task}
				shipmentData={shipment_data}
				primaryService={primary_service}
				selectedMail={selectedMail}
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
				services={services}
			/>
		);
	}

	if (
		task?.task === 'generate_cargo_insurance') {
		return <CargoInsurance task={task} onCancel={onCancel} refetch={taskListRefetch} />;
	}

	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			isLastStep={currentStep === steps.length - STEPS_LENGTH}
			currentStep={currentStep}
			setCurrentStep={setCurrentStep}
			getApisData={taskConfigData?.apis_data}
			uiConfig={taskConfigData?.task_config?.ui_config?.[currentStep]}
			selectedMail={selectedMail}
			serviceIdMapping={serviceIdMapping}
			getShipment={getShipment}
			getShipmentTimeline={getShipmentTimeline}
		/>
	);
}

export default ExecuteTask;
