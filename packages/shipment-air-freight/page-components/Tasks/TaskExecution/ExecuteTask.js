import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import incoTermArray from '../../../constants/inco-terms.json';
import useGetTaskConfig from '../../../hooks/useGetTaskConfig';
import LoadingState from '../LoadingState';

import {
	MarkConfirmServices, GenerateMawb, ConfirmBookingWithAirline, ConfirmSellPrice, ConfirmCargoAir,
} from './CustomTasks';
import UpdateCargoAir from './CustomTasks/UpdateCargoAir';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';

const DEFAULT_STEP_VALUE = 1;
function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
	services = [],
	shipment_data = {},
	primary_service = {},
	getShipment = () => {},
	getShipmentTimeline = () => {},

}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });

	const incoTerm = shipment_data?.inco_term;

	const tradeType = incoTermArray.find((x) => x.value === incoTerm)?.tradeType
		|| primary_service.trade_type;

	const awbExecutionDate =		(shipment_data.documents || []).find(
		(item) => item?.document_type === 'draft_airway_bill'
				&& item?.state === 'document_accepted',
	) || {};

	const service_names = (services || []).map((serviceObj) => (serviceObj?.trade_type === 'export'
		? `origin_${serviceObj?.service_type}`
		: `destination_${serviceObj?.service_type}`));

	(services || []).forEach((serviceObj) => {
		service_names.push(serviceObj.service_type);
	});

	const { serial_id, commodity_category, shipment_type } = shipment_data;

	const modifiedDataForConfig = {
		...(primary_service || {}),
		trade_type: tradeType,
		schedule_arrival:
				primary_service?.schedule_arrival
				|| primary_service?.selected_schedule_arrival,
		schedule_departure:
				primary_service?.schedule_departure
				|| primary_service?.selected_schedule_departure,
		service_names,
		serial_id,
		awbExecutionDate,
		commodity_category,
		shipment_type,
	};

	const {
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution(
		{
			task,
			taskConfigData,
			servicesList   : services,
			primaryService : modifiedDataForConfig,
			onCancel,
			refetch        : taskListRefetch,
		},
	);

	const stepConfigValue = steps.length ? steps[currentStep] || steps[steps.length - DEFAULT_STEP_VALUE] : {};

	if (loading) {
		return <div><LoadingState /></div>;
	}

	if (task?.task === 'mark_confirmed' && 	task?.service_type) {
		const requiredService =			(services || []).filter(
			(serviceObj) => serviceObj?.id === task?.task_field_ids[GLOBAL_CONSTANTS.zeroth_index],
		) || [];

		const localService = requiredService?.[GLOBAL_CONSTANTS.zeroth_index]
			?.service_type?.split('_service')[GLOBAL_CONSTANTS.zeroth_index];
		let requiredLocalService = [];
		requiredLocalService = (services || []).filter(
			(serviceObj) => serviceObj?.service_type === `${localService}_local_service`,
		) || [];

		return (
			<MarkConfirmServices
				task={task}
				onCancel={onCancel}
				refetch={taskListRefetch}
				primaryService={modifiedDataForConfig}
				shipment_data={shipment_data}
				servicesList={[...requiredService, ...requiredLocalService]}
			/>
		);
	}
	if (task?.task === 'upload_mawb_freight_certificate') {
		return (
			<GenerateMawb
				pendingTask={task}
				summary={shipment_data}
				refetch={taskListRefetch}
				clearTask={onCancel}
				services={services}
				primary_service={modifiedDataForConfig}
				tradeType="export"
			/>

		);
	}
	if (
		task?.task === 'confirm_service_provider'
		&& task?.service_type === 'air_freight_service'
	) {
		return (
			<ConfirmBookingWithAirline
				task={task}
				shipmentData={shipment_data}
				onCancel={onCancel}
				refetch={taskListRefetch}
				primary_service={primary_service}
			/>

		);
	}
	if (
		task?.task === 'approve_sell_price'
		&& task?.shipment_type === 'air_freight'
	) {
		return (
			<ConfirmSellPrice
				shipmentData={shipment_data}
				task={task}
				onCancel={onCancel}
				refetch={taskListRefetch}
			/>
		);
	}
	if (
		task.task === 'update_flight_details'
		&& task.shipment_type === 'air_freight'
		&& tradeType === 'import'
	) {
		return (
			<ConfirmCargoAir
				task={task}
				onCancel={onCancel}
				refetch={taskListRefetch}
				timeLineRefetch={getShipmentTimeline}
				services={services}
				primary_service={modifiedDataForConfig}
				shipment_data={shipment_data}
			/>
		);
	}
	if (
		task.task === 'update_flight_departure_and_flight_arrival'
		&& tradeType === 'import'
	) {
		return (
			<UpdateCargoAir
				task={task}
				services={services}
				primary_service={primary_service}
				onCancel={onCancel}
				refetch={taskListRefetch}
				timeLineRefetch={getShipmentTimeline}
				shipment_data={shipment_data}
			/>
		);
	}

	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			primary_service={modifiedDataForConfig}
			onCancel={onCancel}
			refetch={taskListRefetch}
			isLastStep={currentStep === steps.length - DEFAULT_STEP_VALUE}
			currentStep={currentStep}
			setCurrentStep={setCurrentStep}
			getApisData={taskConfigData?.apis_data}
			uiConfig={taskConfigData?.task_config?.ui_config?.[currentStep]}
			selectedMail={selectedMail}
			serviceIdMapping={serviceIdMapping}
			getShipment={getShipment}
			getShipmentTimeline={getShipmentTimeline}
			services={services}
			shipment_data={shipment_data}
			tradeType={tradeType}
		/>
	);
}

export default ExecuteTask;
