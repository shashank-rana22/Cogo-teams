import { Button } from '@cogoport/components';
import { useState } from 'react';

import ShowEmailContent from './ShowEmailContent';
import styles from './styles.module.css';
import TaskDetails from './TaskDetails';
import UpdateAction from './UpdateAction';
import UpdateButton from './UpdateButton';

function Card({
	task = {},
	handleClick = () => {},
	selectedTaskId = '',
	isTaskOpen = false,
	refetch = () => {},
	servicesList = [],
}) {
	const [openView, setOpenView] = useState(false);
	const [taskId, setTaskId] = useState('');

	const handleChange = (newMails) => {
		handleClick(task, newMails);
	};

	const handleEmail = () => {
		setTaskId(task?.id);
		setOpenView(true);
	};

	return (
		<div className={styles.container}>
			<TaskDetails task={task} isTaskOpen={isTaskOpen} servicesList={servicesList} />

			{isTaskOpen ? (
				null
			) : (
				<UpdateButton
					task={task}
					handleClick={handleClick}
					handleChange={handleChange}
					hideButton={task.status === 'completed' || selectedTaskId.length}
					disabledTaskButton={task?.disabled}
				/>
			)}

			{task?.status === 'completed' && task?.assigned_stakeholder === 'system' && (
				<Button
					className={styles.view_button}
					onClick={handleEmail}
				>
					View
				</Button>
			)}

			<UpdateAction
				task={task}
				hideThreeDots={task.status === 'completed'}
				refetch={refetch}
				services={servicesList}
			/>

			{openView && (
				<ShowEmailContent
					taskId={taskId}
					setTaskId={setTaskId}
					openView={openView}
					setOpenView={setOpenView}
				/>
			)}
		</div>
	);
}

export default Card;
