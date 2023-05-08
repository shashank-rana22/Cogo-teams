// import CardList from '@cogo/bookings/commons/CardList';
import { Button, Tabs, TabPanel } from '@cogoport/components';
import { useState, useRef } from 'react';

// import EmptyState from '../../../../../commons/EmptyState';
import taskConfigs from '../../../configs/taskConfigs.json';
import getMutatedControls from '../../../helpers/getMutatedControls';
// import PendingTasks from '../../../PendingTasks/TaskList';
import Loader from '../../Loader';
import tableColumn from '../Invoices/tableColumn';

import AccordianTimeline from './AccordianTimeline';
import styles from './styles.module.css';
import CustomTasks from './Tasks';

export default function AccordionContent({
	activeTab = '',
	item = {},
	tasks = [],
	taskLoading = false,
	handleSubmit = () => {},
	handleAccordionOpen = () => {},
	refetchList = () => {},
	showDeliveryOrderTask = false,
	showInvoiceAndTask,
}) {
	const [myForm, setMyForm] = useState({});
	const [currentStep, setCurrentStep] = useState({
		text  : 'initial_step',
		count : 0,
	});
	const [activeAccordionTab, setActiveAccordionTab] = useState('invoice');

	const formRef = useRef(null);

	const taskConfig = taskConfigs?.[activeTab];
	const currentConfig = taskConfig?.[currentStep?.text];
	const controls = currentConfig?.controls;
	const usingDefaultPendingTasks =		activeTab === 'under_collection' || showDeliveryOrderTask;

	let actionButton = currentConfig?.action_text;
	let manualFinal = false;

	if (
		currentConfig?.conditional_final_step
		&& activeTab === 'collected'
		&& myForm?.delivery_mode === 'telex'
	) {
		actionButton = 'FINISH';
		manualFinal = true;
	}

	const list_of_invoices = item?.invoice_data;

	const handleNextAction = async () => {
		const isFormValid = await formRef.current?.formTrigger();

		if (isFormValid) {
			if (currentConfig?.final_step || manualFinal) {
				handleSubmit({ formValues: myForm, taskConfig });
			} else {
				const next_step_key = currentConfig?.next_step_key;
				setCurrentStep((p) => ({
					text  : myForm?.[next_step_key] || currentConfig?.default_next,
					count : p.count + 1,
				}));
			}
		}
	};

	const renderTask = () => {
		if (taskLoading) {
			return (
				<div className={styles.container}>
					<Loader />
				</div>
			);
		}

		if (tasks?.length === 0) {
			return (
				<div className={styles.container}>
					{/* <EmptyState
						showContent={{
							heading: 'No Results Found!',
							description:
								'Looks like this task has not been created yet, please complete previous tasks first!!',
						}}
					/> */}
				</div>
			);
		}

		return (
			<>
				<div className={styles.form_div}>
					{/* {usingDefaultPendingTasks || showDeliveryOrderTask ? (
						<PendingTasks
							taskList={taskToSend}
							item={item}
							handleAccordionOpen={handleAccordionOpen}
							refetchForTask={refetchForTask}
							tasksLoading={false}
						/>
					) : ( */}
					<div className={styles.accordian_container}>
						<AccordianTimeline
							stepCount={currentStep?.count}
							stepsData={taskConfig?.steps}
						/>
						<div className={styles.form_container}>
							<CustomTasks
								ref={formRef}
								setMyForm={setMyForm}
								controls={mutatedControls}
								handleNextAction={handleNextAction}
							/>
						</div>
					</div>
					{/* )} */}
				</div>

				{usingDefaultPendingTasks ? null : (
					<div className={styles.button_container}>
						<Button onClick={handleNextAction} className="primary lg">
							{actionButton}
						</Button>
					</div>
				)}
			</>
		);
	};

	const refetchForTask = () => {
		refetchList();
		handleAccordionOpen();
	};

	const { mutatedControls } = getMutatedControls({ item, activeTab, controls });

	const filteredTask = tasks.filter((e) => e.task === 'upload_delivery_order');

	const taskToSend =		activeTab === 'collected' && item?.trade_type === 'import'
		? filteredTask
		: tasks;

	return (
		<div className={styles.container}>
			{!showInvoiceAndTask ? (
				<div className={styles.list_container}>
					{/* <CardList fields={tableColumn()} data={list_of_invoices} /> */}
					<div>Card list here</div>
				</div>
			) : (
				<Tabs
					className="horizontal two"
					activeTab={activeAccordionTab}
					onChange={setActiveAccordionTab}
				>
					<TabPanel name="invoice" title="Invoices">
						<div className={styles.list_contaier}>
							{/* <CardList fields={tableColumn()} data={list_of_invoices} /> */}
							<div>Card list here</div>
						</div>
					</TabPanel>

					<TabPanel name="tasks" title="Tasks">
						{renderTask()}
					</TabPanel>
				</Tabs>
			)}
		</div>
	);
}
