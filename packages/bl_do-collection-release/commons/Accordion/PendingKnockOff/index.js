// import CardList from '@cogo/bookings/commons/CardList';
import { Tabs, TabPanel }from '@cogoport/components';
import { useState, useEffect } from 'react';

import PendingTasks from '../../../PendingTasks/TaskList';
import tableColumn from '../Invoices/tableColumn';

import styles from './styles.module.css';

const pendingKnockOff = ({
	item = {},
	tasks = [],
	handleAccordionOpen = () => {},
	refetchList = () => {},
	getShipmentPendingTask = () => {},
	taskLoading = false,
}) => {
	const [activeTab, setActiveTab] = useState('invoice');
	const list_of_invoices = item?.invoice_data;

	const refetchForTask = () => {
		refetchList();
		handleAccordionOpen();
	};

	useEffect(() => {
		if (activeTab === 'tasks') {
			getShipmentPendingTask();
		}
	}, [activeTab]);

	return (
		<div className={styles.container}>
			<Tabs
				className="horizontal two"
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				<TabPanel name="invoice" title="Invoices">
					<div className={styles.list_container}>
						{/* <CardList fields={tableColumn()} data={list_of_invoices} /> */}
						<div>Card list goes here</div>
					</div>
				</TabPanel>

				<TabPanel name="tasks" title="Tasks">
					<PendingTasks
						taskList={tasks}
						item={item}
						handleAccordionOpen={handleAccordionOpen}
						refetchForTask={refetchForTask}
						tasksLoading={taskLoading}
					/>
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default pendingKnockOff;
