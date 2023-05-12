import { Button, Loader } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';

import Card from './Card';
import Header from './Header';
import styles from './styles.module.css';
import TaskExecution from './TaskExecution';
import useListTasksHelper from './useListTasksHelper';

function List() {
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

	if (loading) {
		return (
			<div className={styles.loading_container}>
				Loading Tasks....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Header
				count={count}
				completedTaskCount={completedTaskCount}
				hideCompletedTasks={hideCompletedTasks}
				setHideCompletedTasks={setHideCompletedTasks}
				showMyTasks={showMyTasks}
				setShowMyTasks={setShowMyTasks}
			/>

			{tasksList?.length === 0 ? <EmptyState width={500} height={300} />
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

						{!selectedTaskId ? (tasksList || []).map((task) => (
							<Card
								key={task?.id}
								task={task}
								handleClick={handleClick}
								loading={loading}
							/>
						)) : null}

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
				) }
		</div>
	);
}

export default List;
