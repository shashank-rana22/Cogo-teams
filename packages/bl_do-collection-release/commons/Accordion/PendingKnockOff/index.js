import { Tabs, TabPanel, Table } from '@cogoport/components';
import { useState, useEffect } from 'react';

import PendingTasks from '../../PendingTasks/TaskList';
import { columns } from '../Invoices/tableColumn';

import styles from './styles.module.css';

function PendingKnockOff({
	item = {},
	tasks = [],
	handleAccordionOpen = () => {},
	refetch = () => {},
	getShipmentPendingTask = () => {},
	taskLoading = false,
}) {
	const [activeTab, setActiveTab] = useState('invoice');
	const list_of_invoices = item?.invoice_data || [];

	const refetchForTask = () => {
		refetch();
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
						<Table fields={columns} data={list_of_invoices} />
					</div>
				</TabPanel>

				{tasks.length ? (
					<TabPanel name="tasks" title="Tasks">
						<PendingTasks
							taskList={tasks}
							item={item}
							handleAccordionOpen={handleAccordionOpen}
							refetchForTask={refetchForTask}
							tasksLoading={taskLoading}
						/>
					</TabPanel>
				)
					: null}
			</Tabs>
		</div>
	);
}

export default PendingKnockOff;
