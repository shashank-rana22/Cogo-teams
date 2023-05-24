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

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	setSelectedMail = () => {},
	refetch = () => {},
	services = [],
}) {
	console.log('ds');
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });
	const { mailLoading = true } = useTaskRpa({ setSelectedMail, task });

	const { servicesList, shipment_data, primary_service } = useContext(ShipmentDetailContext);

	const {
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const stepConfigValue = steps.length ? steps[currentStep] || steps[steps.length - 1] : {};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (task?.task === 'mark_confirmed') {
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
				refetch={refetch}
				clearTask={onCancel}
				services={services}
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
