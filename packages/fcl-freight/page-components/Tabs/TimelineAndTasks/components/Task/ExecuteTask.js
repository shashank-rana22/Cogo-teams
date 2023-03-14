import React from 'react';
import dynamic from 'next/dynamic';
import incotermArray from '@cogo/smart-components/constants/inco-terms.json';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from '../../hooks/useTaskExecution';
import BookingNote from './CustomPendingTask/BookingNote';
import UploadCargoArrival from './CustomPendingTask/UploadCargoArrival';
import UploadManifestCopy from './CustomPendingTask/UploadManifestCopy';
import useGetTask from '../../hooks/useGetTask';
import UploadAmendDoc from './CustomPendingTask/UploadAmendDoc';
import AmendDraftHouseBL from './CustomPendingTask/AmendDraftHouseBL';
import UpdateFreightCertificate from './CustomPendingTask/UpdateFreightCertificate';
import MarkConfirmServices from './CustomPendingTask/MarkConfirmServices';
import useTaskRpa from '../../hooks/useTaskRpa';
import GenerateHawb from './CustomPendingTask/GenerateHawb';
import GenerateMawb from './CustomPendingTask/GenerateMawb';
import FTLConfirmationBooking from './CustomPendingTask/FTLConfirmationBooking';
import TrailerConfirmationBooking from './CustomPendingTask/TrailerConfirmationBooking';
import FTLLorryReceipt from './CustomPendingTask/FTLLorryReceipt';
import ContainerPickup from './CustomPendingTask/ContainerPickup';
import NominationTask from './NominationTask';
import ChoosePreference from './CustomPendingTask/ChoosePreference';
import ConfirmCargoAir from './CustomPendingTask/ConfirmCargoAir';
import UpdateCargoAir from './CustomPendingTask/UpdateCargoAir';
import LTLConfirmationOnServicesTaken from './CustomPendingTask/LTLConfirmationOnServicesTaken';
import LTLAddPaymentInfo from './CustomPendingTask/LTLAddPaymentInfo';
import RailBookingQuotation from './CustomPendingTask/RailBookingQuotation';
import UploadIndent from './CustomPendingTask/UploadIndent';
import styles from './styles.module.css';

const UploadDraftBL = dynamic(() =>
	import('./CustomPendingTask/UploadDraftBL'),
);

const excludeServices = [
	'fcl_freight_service',
	'haulage_freight_service',
	'rail_domestic_freight_service',
];

const includeServices = ['air_freight_service', 'lcl_freight_service'];

function ExecuteTask({
	services_data = {},
	task = {},
	onCancel = () => {},
	refetch = () => {},
	shipment_data = {},
	primary_service = {},
	Loader,
	timeLineRefetch = () => {},
	services = [],
	selectedMail,
	setSelectedMail,
	refetchServices = () => {},
}) {
	const { mailLoading } = useTaskRpa({ setSelectedMail, task });
	const incoTerm = shipment_data?.inco_term;
	const tradeType =
		incotermArray.find((x) => x.value === incoTerm)?.tradeType ||
		primary_service.trade_type;
	const service_names = (services || []).map((serviceObj) => {
		return serviceObj?.trade_type === 'export'
			? `origin_${serviceObj?.service_type}`
			: `destination_${serviceObj?.service_type}`;
	});

	(services || []).forEach((serviceObj) => {
		service_names.push(serviceObj.service_type);
	});

	const modifiedDataForConfig = {
		...(primary_service || {}),
		origin_port: primary_service?.origin_port,
		destination_port: primary_service?.destination_port,
		trade_type: tradeType,
		schedule_arrival:
			primary_service?.schedule_arrival ||
			primary_service?.selected_schedule_arrival,
		schedule_departure:
			primary_service?.schedule_departure ||
			primary_service?.selected_schedule_departure,
		service_names,
		serial_id: shipment_data?.serial_id,
	};

	const additionalServicesRail =
		['haulage_freight_service', 'ftl_freight_service'].includes(
			task.service_type,
		) && primary_service.service_type === 'rail_domestic_freight_service';

	if (
		task?.service_type &&
		task?.task === 'mark_confirmed' &&
		(!excludeServices.includes(task?.service_type) || additionalServicesRail)
	) {
		const requiredService =
			(services || []).filter(
				(serviceObj) => serviceObj?.id === task?.task_field_ids[0],
			) || [];

		const localService =
			requiredService?.[0]?.service_type?.split('_service')[0];
		let requiredLocalService = [];
		if (includeServices.includes(requiredService?.[0]?.service_type)) {
			requiredLocalService =
				(services || []).filter(
					(serviceObj) =>
						serviceObj?.service_type === `${localService}_local_service`,
				) || [];
		}

		return (
			<MarkConfirmServices
				task={task}
				services={[...requiredService, ...requiredLocalService]}
				timeLineRefetch={timeLineRefetch}
				shipment_data={shipment_data}
				localService={localService}
				primary_service={primary_service}
				onCancel={onCancel}
				refetch={refetch}
			/>
		);
	}

	if (
		task.task === 'mark_confirmed' &&
		task.service_type === 'rail_domestic_freight_service'
	) {
		return (
			<RailBookingQuotation
				task={task}
				services={services}
				timeLineRefetch={timeLineRefetch}
				shipment_data={shipment_data}
				localService="rail_domestic_freight"
				primary_service={primary_service}
				onCancel={onCancel}
				refetch={refetch}
			/>
		);
	}

	if (
		task?.task_type === 'amend_document' &&
		task?.task !== 'amend_draft_house_bill_of_lading'
	) {
		return (
			<UploadAmendDoc
				task={task}
				shipment_data={primary_service}
				onCancel={onCancel}
				refetch={refetch}
				tradeType={tradeType}
			/>
		);
	}
	if (task?.task === 'amend_draft_house_bill_of_lading') {
		return (
			<AmendDraftHouseBL
				pendingTask={task}
				summary={{
					...(primary_service || {}),
					importer_exporter_id: shipment_data?.importer_exporter?.id,
				}}
				refetch={refetch}
				clearTask={onCancel}
				services={services}
				shipment_data={shipment_data}
			/>
		);
	}

	if (
		task.task === 'upload_draft_bill_of_lading' &&
		!(tradeType === 'import')
	) {
		return (
			<UploadDraftBL
				pendingTask={task}
				summary={{
					...(primary_service || {}),
					importer_exporter_id: shipment_data?.importer_exporter?.id,
				}}
				refetch={refetch}
				clearTask={onCancel}
				services={services}
				shipment_data={shipment_data}
				selectedMail={selectedMail}
			/>
		);
	}
	if (task.task === 'upload_manifest_copy') {
		return (
			<UploadManifestCopy
				pendingTask={task}
				summary={shipment_data}
				refetch={refetch}
				clearTask={onCancel}
				services={services}
			/>
		);
	}
	if (task.task === 'upload_mawb_freight_certificate') {
		return (
			<GenerateMawb
				pendingTask={task}
				summary={shipment_data}
				refetch={refetch}
				clearTask={onCancel}
				services={services}
				primary_service={primary_service}
				tradeType={tradeType}
			/>
		);
	}
	if (task.task === 'upload_hawb_freight_certificate') {
		return (
			<GenerateHawb
				pendingTask={task}
				summary={shipment_data}
				refetch={refetch}
				clearTask={onCancel}
				services={services}
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
	if (task.task === 'generate_freight_certificate') {
		return (
			<UpdateFreightCertificate
				task={task}
				shipmentData={shipment_data}
				services={services}
				primary_service={primary_service}
				refetch={refetch}
				onCancel={onCancel}
				timeLineRefetch={timeLineRefetch}
			/>
		);
	}

	if (
		task.task === 'confirmation_of_booking_with_service_provider' &&
		task.shipment_type === 'ftl_freight'
	) {
		return (
			<FTLConfirmationBooking
				onCancel={onCancel}
				services={services}
				shipment_data={shipment_data}
				task={task}
				timeLineRefetch={timeLineRefetch}
				refetch={refetch}
			/>
		);
	}

	if (
		task.task === 'confirmation_of_booking_with_service_provider' &&
		task.shipment_type === 'haulage_freight' &&
		shipment_data?.all_services?.[0]?.transport_mode === 'trailer'
	) {
		return (
			<TrailerConfirmationBooking
				onCancel={onCancel}
				services={services}
				shipment_data={shipment_data}
				task={task}
				timeLineRefetch={timeLineRefetch}
				refetch={refetch}
			/>
		);
	}

	if (
		task.task === 'confirmation_on_services_taken' &&
		task.shipment_type === 'ltl_freight'
	) {
		return (
			<LTLConfirmationOnServicesTaken
				onCancel={onCancel}
				services={services}
				shipment_data={shipment_data}
				task={task}
				timeLineRefetch={timeLineRefetch}
				refetch={refetch}
			/>
		);
	}

	if (
		task.task === 'upload_lorry_receipt' &&
		task.shipment_type === 'ftl_freight'
	) {
		return (
			<FTLLorryReceipt
				onCancel={onCancel}
				services={services}
				shipment_data={shipment_data}
				task={task}
				timeLineRefetch={timeLineRefetch}
				refetch={refetch}
			/>
		);
	}

	if (
		task.task === 'update_container_details' &&
		['fcl_freight', 'fcl_freight_local'].includes(task.shipment_type)
	) {
		return (
			<ContainerPickup
				pendingTask={task}
				onCancel={onCancel}
				Loader={Loader}
				services={services}
				refetch={refetch}
				timeLineRefetch={timeLineRefetch}
			/>
		);
	}

	if (
		task.task === 'update_flight_details' &&
		task.shipment_type === 'air_freight' &&
		tradeType === 'import'
	) {
		return (
			<ConfirmCargoAir
				task={task}
				onCancel={onCancel}
				refetch={refetch}
				timeLineRefetch={timeLineRefetch}
				services={services}
				primary_service={primary_service}
				shipment_data={shipment_data}
			/>
		);
	}

	if (
		task.task === 'update_flight_departure_and_flight_arrival' &&
		task.shipment_type === 'air_freight' &&
		tradeType === 'import'
	) {
		return (
			<UpdateCargoAir
				task={task}
				onCancel={onCancel}
				refetch={refetch}
				timeLineRefetch={timeLineRefetch}
				services={services}
				primary_service={primary_service}
				shipment_data={shipment_data}
			/>
		);
	}

	if (
		task.task === 'add_payment_info' &&
		task.shipment_type === 'ltl_freight'
	) {
		return (
			<LTLAddPaymentInfo
				onCancel={onCancel}
				services={services}
				shipment_data={shipment_data}
				task={task}
				timeLineRefetch={timeLineRefetch}
				refetch={refetch}
			/>
		);
	}

	if (
		task.task === 'upload_indent' &&
		task.shipment_type === 'rail_domestic_freight'
	) {
		return (
			<UploadIndent
				onCancel={onCancel}
				services={services}
				shipment_data={shipment_data}
				task={task}
				timeLineRefetch={timeLineRefetch}
				refetch={refetch}
			/>
		);
	}

	const { getTaskConfigApi, loading: getTaskLoading } = useGetTask({
		task,
		onCancel,
	});

	const {
		steps = [],
		currentStep,
		setCurrentStep,
		serviceIdMapping,
	} = useTaskExecution({
		task,
		getTaskConfigApi,
		primary_service: modifiedDataForConfig,
		services,
		selectedMail,
		shipment_data,
	});

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - 1]
		: {};

	if (
		task.task === 'upload_booking_note' &&
		task.shipment_type === 'fcl_freight'
	) {
		if (mailLoading) {
			return Loader;
		}
		return (
			<div>
				<BookingNote
					shipment_data={shipment_data}
					task={task}
					onCancel={onCancel}
					getTaskConfigApi={getTaskConfigApi}
					refetch={refetch}
					services={services}
					timeLineRefetch={timeLineRefetch}
					selectedMail={selectedMail}
					refetchServices={refetchServices}
				/>
			</div>
		);
	}

	if (task.task === 'choose_service_provider') {
		return (
			<div>
				<ChoosePreference
					only_select_rate
					shipment_data={shipment_data}
					task={task}
					onCancel={onCancel}
					getTaskConfigApi={getTaskConfigApi}
					refetch={refetch}
					timeLineRefetch={timeLineRefetch}
					services={services}
				/>
			</div>
		);
	}

	if (
		task.task === 'update_nomination_details' &&
		task.shipment_type === 'fcl_freight'
	) {
		return (
			<NominationTask
				shipment_data={modifiedDataForConfig}
				shipment_overall_data={shipment_data}
				task={task}
				stepConfig={stepConfigValue}
				onCancel={onCancel}
				refetch={refetch}
				Loader={Loader}
			/>
		);
	}

	return (
		<div className={styles.task_container}>
			{getTaskLoading ? (
				Loader
			) : (
				<ExecuteStep
					services_data={services_data}
					task={task}
					stepConfig={stepConfigValue}
					onCancel={onCancel}
					refetch={refetch}
					shipment_data={modifiedDataForConfig}
					isLastStep={currentStep === steps.length - 1}
					currentStep={currentStep}
					setCurrentStep={setCurrentStep}
					serviceIdMapping={serviceIdMapping}
					getApisData={getTaskConfigApi?.response?.data?.apis_data}
					timeLineRefetch={timeLineRefetch}
					selectedMail={selectedMail}
					uiConfig={getTaskConfigApi?.data?.task_config?.ui_config[currentStep]}
				/>
			)}
		</div>
	);
}

export default ExecuteTask;
