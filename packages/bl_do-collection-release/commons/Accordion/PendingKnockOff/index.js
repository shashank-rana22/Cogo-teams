import { Tabs, TabPanel, Table } from '@cogoport/components';
import { useState, useEffect } from 'react';

import getTableFormatedData from '../../../helpers/getTableFormatedData';
import PendingTasks from '../../PendingTasks/TaskList';
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
	// const [activeTab, setActiveTab] = useState('invoice');
	const list_of_invoices = item?.invoice_data || [];

	const tableData = getTableFormatedData(list_of_invoices);

	const refetchForTask = () => {
		refetchList();
		handleAccordionOpen();
	};

	const onTabChange = (val) => {
		if (val === 'tasks') {
			getShipmentPendingTask();
		}
	};

	return (
		<div className={styles.container}>
			<Tabs
				defaultTab="invoice"
				onChange={(val) => onTabChange(val)}
			>
				<TabPanel name="invoice" title="Invoices">
					<div className={styles.list_container}>
						<Table fields={columns} data={tableData} />
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
}

export default PendingKnockOff;
