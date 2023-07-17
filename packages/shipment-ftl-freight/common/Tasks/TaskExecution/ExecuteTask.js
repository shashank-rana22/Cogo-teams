import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useGetTaskConfig from '../../../hooks/useGetTaskConfig';

import {
	MarkConfirmServices,
	CustomerInvoiceDetails,
	ApproveTruck,
	ApprovePurchaseDeduction,
} from './CustomTasks';
import ExecuteStep from './ExecuteStep';
import useTaskExecution from './helpers/useTaskExecution';
import styles from './styles.module.css';

const LAST_INDEX = 1;

function ExecuteTask({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	selectedMail = [],
}) {
	const { taskConfigData = {}, loading = true } = useGetTaskConfig({ task });

	const { servicesList, shipment_data, primary_service, getShipmentTimeline } = useContext(ShipmentDetailContext);

	const {
		steps = [],
		currentStep = {},
		setCurrentStep = () => {},
		serviceIdMapping = [],
	} = useTaskExecution({ task, taskConfigData });

	const stepConfigValue = steps.length
		? steps[currentStep] || steps[steps.length - LAST_INDEX]
		: {};

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader />
				Loading Task
			</div>
		);
	}
	if (task.task === 'update_customer_invoice_details') {
		return (
			<CustomerInvoiceDetails
				onCancel={onCancel}
				servicesList={servicesList}
				shipment_data={shipment_data}
				task={task}
				refetch={taskListRefetch}
				getShipmentTimeline={getShipmentTimeline}
			/>
		);
	}

	if (
		task.service_type
		&& task.task === 'mark_confirmed'
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

	if (['approve_additional_truck', 'approve_updated_truck'].includes(task?.task)) {
		return (
			<ApproveTruck
				onCancel={onCancel}
				services={servicesList}
				shipment_data={shipment_data}
				task={task}
				timeLineRefetch={getShipmentTimeline}
				taskListRefetch={taskListRefetch}
			/>
		);
	}
	if (
		task.task === 'approve_purchase_deduction'
		&& task.shipment_type === 'ftl_freight'
	) {
		return (
			<ApprovePurchaseDeduction
				onCancel={onCancel}
				services={servicesList}
				shipment_data={shipment_data}
				task={task}
				timeLineRefetch={getShipmentTimeline}
				refetch={taskListRefetch}
			/>
		);
	}

	return (
		<ExecuteStep
			task={task}
			stepConfig={stepConfigValue}
			onCancel={onCancel}
			refetch={taskListRefetch}
			isLastStep={currentStep === steps.length - LAST_INDEX}
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
