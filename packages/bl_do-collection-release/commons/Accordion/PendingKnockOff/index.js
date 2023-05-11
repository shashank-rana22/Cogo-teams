import { Table, cl } from '@cogoport/components';
import { useState } from 'react';

import getTableFormatedData from '../../../helpers/getTableFormatedData';
import ClickableDiv from '../../ClickableDiv';
import PendingTasks from '../../PendingTasks/TaskList';
import { columns } from '../Invoices/tableColumn';

import styles from './styles.module.css';

const Tabs = [
	{ label: 'Invoices', value: 'invoice' },
	{ label: 'Tasks', value: 'tasks' },
];

function PendingKnockOff({
	item = {},
	tasks = [],
	handleAccordionOpen = () => {},
	refetchList = () => {},
	getShipmentPendingTask = () => {},
	taskLoading = false,
}) {
	const [tab, setTab] = useState('invoice');
	console.log('tab', tab);
	const list_of_invoices = item?.invoice_data || [];

	const tableData = getTableFormatedData(list_of_invoices);

	const refetchForTask = () => {
		refetchList();
		handleAccordionOpen();
	};

	const onTabChange = (currentTab) => {
		if (currentTab.value === 'tasks') {
			getShipmentPendingTask();
		}
		setTab(currentTab.value);
	};

	return (
		<div className={styles.container}>
			<div className={styles.service_tabs}>
				{
				Tabs.map((currentTab) => (
					<ClickableDiv onClick={() => onTabChange(currentTab)}>
						<div className={cl`${tab === currentTab.value ? styles.active : ''} 
				${styles.service_tab}`}
						>
							{currentTab.label}
						</div>
					</ClickableDiv>
				))
			}
			</div>
			<div>
				{
				tab === 'invoice'
					? <Table columns={columns} data={tableData} />
					: (
						<PendingTasks
							taskList={tasks}
							item={item}
							handleAccordionOpen={handleAccordionOpen}
							refetchForTask={refetchForTask}
							tasksLoading={taskLoading}
						/>
					)
			}
			</div>

		</div>
	);
}

export default PendingKnockOff;
