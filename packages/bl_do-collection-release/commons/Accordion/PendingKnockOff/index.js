// import CardList from '@cogo/bookings/commons/CardList';
import { Tabs, TabPanel, Table } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import PendingTasks from '../../../PendingTasks/TaskList';
import { columns } from '../Invoices/tableColumn';

import styles from './styles.module.css';

function PendingKnockOff({
	item = {},
	tasks = [],
	handleAccordionOpen = () => {},
	refetchList = () => {},
	getShipmentPendingTask = () => {},
	taskLoading = false,
}) {
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				onChange={(val) => setActiveTab(val)}
			>
				<TabPanel name="invoice" title="Invoices">
					<div className={styles.list_container}>
						Invoices
						{/* <Table fields={columns} data={list_of_invoices} /> */}
					</div>
				</TabPanel>

				<TabPanel name="tasks" title="Tasks">
					<div>Task</div>
					{/* <PendingTasks
						taskList={tasks}
						item={item}
						handleAccordionOpen={handleAccordionOpen}
						refetchForTask={refetchForTask}
						tasksLoading={taskLoading}
					/> */}
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default PendingKnockOff;
