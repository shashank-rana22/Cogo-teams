import { ShipmentDetailContext } from '@cogoport/context';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { useContext } from 'react';

import { CUSTOM_TASKS } from '../../../constants/custom-tasks';
import useGetOrganization from '../../../hooks/useGetOrganization';
import useGetTaskConfig from '../../../hooks/useGetTaskConfig';
import useListShipmentTradePartners from '../../../hooks/useListShipmentTradePartners';
import useTaskRpa from '../../../hooks/useTaskRpa';

import {
	MarkConfirmServices,
	UploadDraftBL,
	UploadSI,
	MarkIgmShipmentConfirm,
} from './CustomTasks';
import CargoInsurance from './CustomTasks/CargoInsurance';
import ConfirmFreightBooking from './CustomTasks/ConfirmFreightBooking';
import ExecuteStep from './ExecuteStep';
import getCustomTaskComponent from './getCustomTaskComponent';
import useTaskExecution from './helpers/useTaskExecution';

const EXCLUDED_SERVICES = [
	'fcl_freight_service',
	'haulage_freight_service',
];

const INCLUDED_ORG = ['nvocc', 'freight_forwarder'];
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
	const {
		servicesList = [],
		shipment_data = {},
		primary_service = {},
		stakeholderConfig = {},
		refetch: getShipmentRefetch = () => {},
	} = useContext(ShipmentDetailContext);

	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });
	const { mailLoading = true } = useTaskRpa({ setSelectedMail, task });
	const { data: shipmentTradePartnersData } = useListShipmentTradePartners({ shipment_id: shipment_data?.id, task });

	const showIgmTasks = !!stakeholderConfig?.tasks?.show_igm_tasks;

	const {
		steps = [],
		currentStep = 0,
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const { orgData } = useGetOrganization({
		primary_service,
		task,
	});

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - INDEX_OFFSET_FOR_LAST_ELEMENT]
		: {};

	if (loading) {
		return (
			<ThreeDotLoader message="Fetching Task" />
		);
	}

	if (CUSTOM_TASKS.includes(task?.task)) {
		const { propsMapping = {}, COMPONENT_MAPPING = {} } = getCustomTaskComponent({
			task,
			shipment_data,
			servicesList,
			primary_service,
			onCancel,
			tasksList,
			selectedMail,
			taskListRefetch,
			mailLoading,
			getShipmentRefetch,
			shipmentTradePartnersData,
		});

		const RenderComponent = COMPONENT_MAPPING?.[task?.task];
		const renderProps = propsMapping?.[task?.task] || {};

		if (RenderComponent) {
			return (<RenderComponent {...renderProps} />);
		}
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
				refetch={taskListRefetch}
				primaryService={primary_service}
				shipment_data={shipment_data}
				servicesList={servicesList}
			/>
		);
	}

	if (
		task?.task === 'upload_draft_bill_of_lading'
	&& (
		(primary_service?.trade_type === 'import' && shipment_data?.end_to_end_shipment?.is_possible)
		|| primary_service?.trade_type === 'export'
	)
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

	if (task?.task === 'generate_cargo_insurance' && SERVICES_FOR_INSURANCE.includes(primary_service?.service_type)) {
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

	let isSeawayAndMarkConfirm = false;
	if (task?.task === 'mark_confirmed'
		&& primary_service?.bl_type === 'seaway'
		&& task?.state === 'shipment_received') {
		isSeawayAndMarkConfirm = true;
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
			uiConfig={taskConfigData?.task_config?.ui_config?.[currentStep]}
			selectedMail={selectedMail}
			serviceIdMapping={serviceIdMapping}
			isSeawayAndMarkConfirm={isSeawayAndMarkConfirm}
		/>
	);
}

export default ExecuteTask;
