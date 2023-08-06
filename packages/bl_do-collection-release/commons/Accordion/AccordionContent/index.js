import { Tabs, TabPanel, Table } from '@cogoport/components';
import { useState, useRef } from 'react';

import blTaskConfigs from '../../../configs/blTaskConfigs.json';
import doTaskConfigs from '../../../configs/doTaskConfigs.json';
import getMutatedControls from '../../../helpers/getMutatedControls';
import getTableFormatedData from '../../../helpers/getTableFormatedData';
import useGetBill from '../../../hooks/useGetBill';
import { columns } from '../Invoices/tableColumn';

import { RenderTask } from './RenderTask';
import styles from './styles.module.css';

const CURRENT_STEP_NEXT_INDEX = 1;
export default function AccordionContent({
	stateProps = {},
	item = {},
	tasks = [],
	taskLoading = false,
	handleSubmit = () => {},
	handleAccordionOpen = () => {},
	refetch = () => {},
	showDeliveryOrderTask = false,
	showInvoiceAndTask = false,
	showTask = false,
}) {
	const [myForm, setMyForm] = useState({});
	const [currentStep, setCurrentStep] = useState({
		text  : 'initial_step',
		count : 0,
	});
	const [activeAccordionTab, setActiveAccordionTab] = useState(showTask ? 'tasks' : 'invoice');

	const formRef = useRef(null);

	const { activeTab, inner_tab, shipment_type } = stateProps || {};

	const taskConfig = activeTab === 'bl'
		? blTaskConfigs?.[inner_tab]
		: doTaskConfigs?.[inner_tab];

	const currentConfig = taskConfig?.[currentStep?.text];
	const controls = currentConfig?.controls;

	const usingDefaultPendingTasks = inner_tab === 'under_collection' || showDeliveryOrderTask;

	let actionButton = currentConfig?.action_text;
	let manualFinal = false;

	if (
		currentConfig?.conditional_final_step
		&& inner_tab === 'collected'
		&& myForm?.delivery_mode === 'telex'
	) {
		actionButton = 'FINISH';
		manualFinal = true;
	}

	const { MUTATED_CONTROLS } = getMutatedControls({ item, stateProps, controls });

	const list_of_invoices = item?.invoice_data || [];
	const accordionOpen = (activeAccordionTab === 'invoice' && !showTask);
	const { data } = useGetBill({ serial_id: item?.serial_id, accordionOpen });
	const tableData = getTableFormatedData({ list_of_invoices, data });

	const handleNextAction = async () => {
		const isFormValid = await formRef.current?.formTrigger();

		if (isFormValid) {
			if (currentConfig?.final_step || manualFinal) {
				handleSubmit({ formValues: myForm, taskConfig });
			} else {
				const next_step_key = currentConfig?.next_step_key;
				setCurrentStep((p) => ({
					text  : myForm?.[next_step_key] || currentConfig?.default_next,
					count : p.count + CURRENT_STEP_NEXT_INDEX,
				}));
			}
		}
	};
	const refetchForTask = () => {
		refetch();
		handleAccordionOpen();
	};

	const filteredTask = tasks.filter((e) => e.task === 'upload_delivery_order');

	const taskToSend = inner_tab === 'collected' && activeTab === 'do'
		? filteredTask
		: tasks;

	if (showTask) {
		return (
			<div className={styles.container}>
				<Tabs
					themeType="tertiary"
					activeTab={activeAccordionTab}
					onChange={setActiveAccordionTab}
				>
					<TabPanel name="tasks" title="Tasks">
						<RenderTask
							taskLoading={taskLoading}
							tasks={tasks}
							usingDefaultPendingTasks={usingDefaultPendingTasks}
							showDeliveryOrderTask={showDeliveryOrderTask}
							taskToSend={taskToSend}
							item={item}
							handleAccordionOpen={handleAccordionOpen}
							refetchForTask={refetchForTask}
							shipment_type={shipment_type}
							formRef={formRef}
							setMyForm={setMyForm}
							MUTATED_CONTROLS={MUTATED_CONTROLS}
							handleNextAction={handleNextAction}
							actionButton={actionButton}
							currentStep={currentStep}
							taskConfig={taskConfig}
						/>
					</TabPanel>
				</Tabs>
			</div>
		);
	}
	return (
		<div className={styles.container}>
			{!showInvoiceAndTask ? (
				<div className={styles.list_container}>
					<Table columns={columns} data={tableData} />
				</div>
			) : (
				<Tabs
					className="horizontal two"
					activeTab={activeAccordionTab}
					onChange={setActiveAccordionTab}
				>
					<TabPanel name="invoice" title="Invoices">
						<div className={styles.list_container}>
							<Table columns={columns} data={tableData} />
						</div>
					</TabPanel>

					<TabPanel name="tasks" title="Tasks">
						<RenderTask
							taskLoading={taskLoading}
							tasks={tasks}
							usingDefaultPendingTasks={usingDefaultPendingTasks}
							showDeliveryOrderTask={showDeliveryOrderTask}
							taskToSend={taskToSend}
							item={item}
							handleAccordionOpen={handleAccordionOpen}
							refetchForTask={refetchForTask}
							shipment_type={shipment_type}
							formRef={formRef}
							setMyForm={setMyForm}
							MUTATED_CONTROLS={MUTATED_CONTROLS}
							handleNextAction={handleNextAction}
							actionButton={actionButton}
							currentStep={currentStep}
							taskConfig={taskConfig}
						/>
					</TabPanel>
				</Tabs>
			)}
		</div>
	);
}
