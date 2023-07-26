import { Button, Tabs, TabPanel, Table } from '@cogoport/components';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef } from 'react';

import taskConfigs from '../../../configs/taskConfigs.json';
import getMutatedControls from '../../../helpers/getMutatedControls';
import getTableFormatedData from '../../../helpers/getTableFormatedData';
import useGetBill from '../../../hooks/useGetBill';
import EmptyState from '../../EmptyState';
import PendingTasks from '../../PendingTasks/TaskList';
import { columns } from '../Invoices/tableColumn';

import AccordianTimeline from './AccordianTimeline';
import styles from './styles.module.css';
import CustomTasks from './Tasks';

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
	showInvoiceAndTask,
	showTask,
}) {
	const [myForm, setMyForm] = useState({});
	const [currentStep, setCurrentStep] = useState({
		text  : 'initial_step',
		count : 0,
	});
	const [activeAccordionTab, setActiveAccordionTab] = useState(showTask ? 'tasks' : 'invoice');

	const formRef = useRef(null);

	const taskConfig = taskConfigs?.[stateProps.inner_tab];
	const currentConfig = taskConfig?.[currentStep?.text];
	const controls = currentConfig?.controls;
	const usingDefaultPendingTasks = stateProps.inner_tab === 'under_collection' || showDeliveryOrderTask;

	let actionButton = currentConfig?.action_text;
	let manualFinal = false;

	if (
		currentConfig?.conditional_final_step
		&& stateProps.inner_tab === 'collected'
		&& myForm?.delivery_mode === 'telex'
	) {
		actionButton = 'FINISH';
		manualFinal = true;
	}

	const { mutatedControls } = getMutatedControls({ item, stateProps, controls });

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

	const taskToSend = stateProps.inner_tab === 'collected' && item?.trade_type === 'import'
		? filteredTask
		: tasks;

	const renderTask = () => {
		if (taskLoading) {
			return (
				<div className={styles.loading_container}>
					<ThreeDotLoader message="Loading Tasks" fontSize={16} width={30} />
				</div>
			);
		}

		if (isEmpty(tasks)) {
			return (
				<div>
					<EmptyState
						heading="No Task found !!"
						subHeading="Looks like this task has not been created yet,
						please complete previous tasks first!!"
					/>
				</div>
			);
		}

		return (
			<>
				<div className={styles.form_div}>
					{usingDefaultPendingTasks || showDeliveryOrderTask ? (
						<PendingTasks
							taskList={taskToSend}
							item={item}
							handleAccordionOpen={handleAccordionOpen}
							refetchForTask={refetchForTask}
							tasksLoading={false}
							shipment_type={stateProps.shipment_type}
						/>
					) : (
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
					)}
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
	if (showTask) {
		return (
			<div className={styles.container}>
				<Tabs
					themeType="tertiary"
					activeTab={activeAccordionTab}
					onChange={setActiveAccordionTab}
				>
					<TabPanel name="tasks" title="Tasks">
						{renderTask()}
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
						{renderTask()}
					</TabPanel>
				</Tabs>
			)}
		</div>
	);
}
