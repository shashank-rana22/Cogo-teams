import { ShipmentDetailContext } from '@cogoport/context';
import { AddCompanyModal } from '@cogoport/ocean-modules';
import { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';
import useListShipmentTradePartners from '../../../hooks/useListShipmentTradePartners';
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
	UploadComplianceDocs,
} from './CustomTasks';
import CargoInsurance from './CustomTasks/CargoInsurance';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

const EXCLUDED_SERVICES = [
	'fcl_freight_service',
	'haulage_freight_service',
];

const TRADE_PARTY_TYPE = {
	add_consignee_details : { trade_party_type: 'consignee' },
	add_shipper_details   : { trade_party_type: 'shipper' },
};

const REDUCE_LENGTH_BY = 1;
const SERVICES_FOR_INSURANCE = ['fcl_freight_service'];

const INDEX_OFFSET_FOR_LAST_ELEMENT = 1;

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	setSelectedMail = () => {},
	tasksList = [],
}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });
	const { mailLoading = true } = useTaskRpa({ setSelectedMail, task });
	const { servicesList, shipment_data, primary_service } = useContext(ShipmentDetailContext);
	const { data } = useListShipmentTradePartners({ shipment_id: shipment_data?.id });

	const {
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - INDEX_OFFSET_FOR_LAST_ELEMENT]
		: {};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (
		task.service_type
		&& task.task === 'mark_confirmed'
		&& (!EXCLUDED_SERVICES.includes(task.service_type))
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

	if (task.task === 'update_container_details') {
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

	if (['add_consignee_details', 'add_shipper_details'].includes(task.task)) {
		return (
			<AddCompanyModal
				tradePartnersData={data}
				addCompany={TRADE_PARTY_TYPE[task.task]}
				tradePartnerTrigger={taskListRefetch}
				shipment_id={shipment_data?.id}
				importer_exporter_id={shipment_data?.importer_exporter_id}
				throughPoc={false}
				setAddCompany={onCancel}
			/>
		);
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

	if (task?.task === 'generate_cargo_insurance' && SERVICES_FOR_INSURANCE.includes(primary_service?.service_type)) {
		return <CargoInsurance task={task} onCancel={onCancel} refetch={taskListRefetch} />;
	}

	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			isLastStep={currentStep === steps.length - REDUCE_LENGTH_BY}
			shipment_data={shipment_data}
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
