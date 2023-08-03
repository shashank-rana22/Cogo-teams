import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import { isEmpty } from '@cogoport/utils';

import Card from './Card';
import Header from './Header';
import styles from './styles.module.css';
import TaskExecution from './TaskExecution';
import useListTasksHelper from './useListTasksHelper';

function List() {
	const {
		count,
		completedTaskCount,
		tasksList = [],
		loading,
		taskListRefetch = () => {},
		hideCompletedTasks,
		setHideCompletedTasks = () => {},
		handleClick = () => {},
		selectedTaskId,
		setSelectedTaskId = () => {},
		shipment_data = {},
		showMyTasks,
		setShowMyTasks = () => {},
		selectedMail,
		setSelectedMail = () => {},
	} = useListTasksHelper();

	if (loading) {
		return (
			<div className={styles.loading_container}>
				<ThreeDotLoader message="Loading Tasks" fontSize={16} size={30} />
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

			{isEmpty(tasksList) ? <EmptyState width={500} height={300} />
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
									shipment_data={shipment_data}
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
