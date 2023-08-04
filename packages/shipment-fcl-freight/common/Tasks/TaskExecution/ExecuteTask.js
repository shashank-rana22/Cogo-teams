import { ShipmentDetailContext } from '@cogoport/context';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { useContext } from 'react';

import useGetOrganization from '../../../hooks/useGetOrganization';
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
	AmendDraftBl,
	UploadSI,
	MarkIgmShipmentConfirm,
	UploadComplianceDocs,
} from './CustomTasks';
import CargoInsurance from './CustomTasks/CargoInsurance';
import ConfirmFreightBooking from './CustomTasks/ConfirmFreightBooking';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

const EXCLUDE_SERVICES = [
	'fcl_freight_service',
];

const INCLUDED_ORG = ['nvocc', 'freight_forwarder'];
const REDUCE_LENGTH_BY = 1;

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	setSelectedMail = () => {},
	tasksList = [],
}) {
	const { servicesList, shipment_data, primary_service, stakeholderConfig } = useContext(ShipmentDetailContext);

	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });
	const { mailLoading = true } = useTaskRpa({ setSelectedMail, task });

	const showIgmTasks = !!stakeholderConfig?.tasks?.show_igm_tasks;

	const {
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const { orgData } = useGetOrganization({
		primary_service,
		task,
	});

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - REDUCE_LENGTH_BY]
		: {};

	if (loading) {
		return (
			<ThreeDotLoader message="Fetching Task" />
		);
	}

	if (
		task.service_type
		&& task.task === 'mark_confirmed'
		&& (!EXCLUDE_SERVICES.includes(task.service_type))
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
		return (
			<AmendDraftBl
				task={task}
				shipmentData={shipment_data}
				primaryService={primary_service}
				selectedMail={selectedMail}
				clearTask={onCancel}
				taskListRefetch={taskListRefetch}
			/>
		);
	}

	if (task.task === 'choose_service_provider') {
		return (
			<ChooseServiceProvider
				task={task}
				onCancel={onCancel}
				refetch={taskListRefetch}
				services={servicesList}
			/>

		);
	}

	if (task.task === 'update_nomination_details') {
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

	if (task.task === 'upload_si' && primary_service?.trade_type === 'export') {
		return (
			<UploadSI
				pendingTask={task}
				onCancel={onCancel}
				services={servicesList}
				taskListRefetch={taskListRefetch}
			/>
		);
	}

	if (
		task?.task === 'generate_cargo_insurance') {
		return <CargoInsurance task={task} onCancel={onCancel} refetch={taskListRefetch} />;
	}

	if (task.task === 'upload_compliance_documents') {
		return (
			<UploadComplianceDocs
				task={task}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
				tasksList={tasksList}
			/>
		);
	}

	if (task?.task === 'generate_cargo_insurance') {
		return <CargoInsurance task={task} onCancel={onCancel} refetch={taskListRefetch} />;
	}

	if (task.task === 'mark_confirmed' && task.service_type === 'fcl_freight_service'
	&& !orgData?.data?.category_types?.includes('shipping_line')
	&& orgData?.data?.category_types?.some((value) => INCLUDED_ORG.includes(value))
        && primary_service?.trade_type === 'export'
	) {
		return (
			<ConfirmFreightBooking
				task={task}
				getApisData={taskConfigData?.apis_data}
				onCancel={onCancel}
				services={servicesList}
				taskListRefetch={taskListRefetch}
			/>
		);
	}

	if (showIgmTasks && task?.task === 'mark_igm_shipment_confirmed') {
		return (
			<MarkIgmShipmentConfirm
				task={task}
				taskConfigData={taskConfigData}
				onCancel={onCancel}
				taskListRefetch={taskListRefetch}
				tasksList={tasksList}
			/>
		);
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
			uiConfig={taskConfigData?.task_config?.ui_config[currentStep]}
			selectedMail={selectedMail}
			serviceIdMapping={serviceIdMapping}
		/>
	);
}

export default ExecuteTask;
