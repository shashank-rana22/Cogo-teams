import { ShipmentDetailContext } from '@cogoport/context';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import {
	UploadCargoArrival,
	UploadContainerDetails,
	MarkConfirmServices,
	UploadDraftBL,
} from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

const EXCLUDED_SERVICES = ['haulage_freight_service'];
const REDUCE_LENGTH_BY = 1;

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });

	const { servicesList, shipment_data, primary_service } = useContext(ShipmentDetailContext);

	const {
		steps = [],
		currentStep = 0,
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - REDUCE_LENGTH_BY]
		: {};

	if (loading) {
		return <ThreeDotLoader message="Fetching Task" />;
	}

	if (
		task.service_type
		&& task.task === 'mark_confirmed'
		&& !EXCLUDED_SERVICES.includes(task?.service_type)
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
				selectedMail={selectedMail}
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

	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			isLastStep={currentStep === steps.length - REDUCE_LENGTH_BY}
			currentStep={currentStep}
			setCurrentStep={setCurrentStep}
			getApisData={taskConfigData?.apis_data}
			uiConfig={taskConfigData?.task_config?.ui_config?.[currentStep]}
			selectedMail={selectedMail}
			serviceIdMapping={serviceIdMapping}
		/>
	);
}

export default ExecuteTask;
