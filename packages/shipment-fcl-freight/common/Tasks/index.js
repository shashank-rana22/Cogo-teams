import { Button, Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import EmptyState from '../EmptyState';

import Card from './Card';
import Header from './Header';
import styles from './styles.module.css';
import TaskExecution from './TaskExecution';
import useListTasksHelper from './useListTasksHelper';

const IGM_TASKS = ['mark_igm_shipment_confirmed', 'upload_igm_document', 'upload_checklist'];

function List() {
	const { stakeholderConfig } = useContext(ShipmentDetailContext);

	const {
		count = 0,
		completedTaskCount = 0,
		tasksList = [],
		loading = true,
		taskListRefetch = () => {},
		hideCompletedTasks = false,
		setHideCompletedTasks = () => {},
		handleClick = () => {},
		selectedTaskId,
		setSelectedTaskId = () => {},
		showMyTasks = true,
		setShowMyTasks = () => {},
		selectedMail = [],
		setSelectedMail = () => {},
	} = useListTasksHelper();

	const showIgmTasks = !!stakeholderConfig?.tasks?.show_igm_tasks;

	const IGM_TASK_LIST = [];

	tasksList.forEach((item) => {
		if (IGM_TASKS.includes(item?.task)) {
			IGM_TASK_LIST.push(item);
		}
	});

	const updatedTaskList = showIgmTasks ? IGM_TASK_LIST : tasksList;

	if (loading) {
		return (
			<div className={styles.loading_container}>
				<Loader themeType="primary" className={styles.loader_icon} />
				Loading Tasks....
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!showIgmTasks ? (
				<Header
					count={count}
					completedTaskCount={completedTaskCount}
					hideCompletedTasks={hideCompletedTasks}
					setHideCompletedTasks={setHideCompletedTasks}
					showMyTasks={showMyTasks}
					setShowMyTasks={setShowMyTasks}
				/>
			) : null }

			{isEmpty(updatedTaskList)
				? <EmptyState title="No Tasks Found" subtitle="Looks like you have no remaining tasks" />
				: (
					<>

						{selectedTaskId ? (
							<Button
								className={styles.see_all_tasks}
								onClick={() => setSelectedTaskId(null)}
								themeType="link"
								size="md"
							>
								<IcMArrowBack width={50} />
								<div style={{ width: 200 }}>See All Tasks</div>
							</Button>
						) : null}

						{!selectedTaskId
							? (updatedTaskList || []).map((task) => (
								<Card
									key={task?.id}
									task={task}
									handleClick={handleClick}
									loading={loading}
									tasksList={updatedTaskList}
								/>
							)) : null}

						{selectedTaskId ? (
							<>
								<Card
									task={updatedTaskList?.find((task) => task.id === selectedTaskId)}
									handleClick={handleClick}
									isTaskOpen
									loading={loading}
									tasksList={updatedTaskList}
								/>

								<TaskExecution
									task={updatedTaskList?.find((task) => task.id === selectedTaskId)}
									onCancel={() => setSelectedTaskId(null)}
									taskListRefetch={taskListRefetch}
									selectedMail={selectedMail}
									setSelectedMail={setSelectedMail}
									tasksList={tasksList}
								/>
							</>
						) : null }
					</>
				) }
		</div>
	);
}

export default List;
