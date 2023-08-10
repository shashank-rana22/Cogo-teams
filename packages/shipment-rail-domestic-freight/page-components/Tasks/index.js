import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import EmptyState from '@cogoport/surface-modules/common/EmptyState';
import { isEmpty } from '@cogoport/utils';

import useTask from '../../hooks/useTask';

import Card from './Card';
import Header from './Header';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import TaskExecution from './TaskExecution';

function Tasks() {
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
		show = false,
		setShow = () => {},
	} = useTask();

	return (
		<div>
			<Header
				count={count}
				completedTaskCount={completedTaskCount}
				hideCompletedTasks={hideCompletedTasks}
				setHideCompletedTasks={setHideCompletedTasks}
				showMyTasks={showMyTasks}
				setShowMyTasks={setShowMyTasks}
			/>

			{loading ? <LoadingState /> : null}

			{isEmpty(tasksList) && !loading ? <EmptyState /> : null}

			{!isEmpty(tasksList) && !loading ? (
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
					) : (tasksList || []).map((task) => (
						<Card
							key={task?.id}
							task={task}
							handleClick={handleClick}
							refetch={taskListRefetch}
							show={show}
							setShow={setShow}
						/>
					)) }

					{selectedTaskId ? (
						<>
							<Card
								task={tasksList?.find((task) => task.id === selectedTaskId)}
								handleClick={handleClick}
								isTaskOpen
								loading={loading}
							/>

							<TaskExecution
								task={tasksList?.find((task) => task.id === selectedTaskId)}
								onCancel={() => setSelectedTaskId(null)}
								taskListRefetch={taskListRefetch}
								selectedMail={selectedMail}
								setSelectedMail={setSelectedMail}
							/>
						</>
					) : null }
				</>
			) : null}
		</div>
	);
}

export default Tasks;
