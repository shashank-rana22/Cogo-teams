import { useState } from 'react';

import styles from './styles.module.css';
import TaskDetails from './TaskDetails';
import UpdateAction from './UpdateAction';
import UpdateButton from './UpdateButton';
import ViewEmailContent from './ViewEmialContent';

function Card({
	task = {},
	handleClick = () => {},
	selectedTaskId = '',
	isTaskOpen = false,
	tasksList = [],
}) {
	const [showEmailModal, setShowEmialModal] = useState(false);

	const handleChange = (newMails) => {
		handleClick(task, newMails);
	};

	const handleEmail = () => {
		setShowEmialModal(true);
	};

	return (
		<div className={styles.container}>

			<TaskDetails task={task} isTaskOpen={isTaskOpen} />

			<div className={styles.action}>
				{isTaskOpen ? (
					null
				) : (
					<UpdateButton
						task={task}
						handleClick={handleClick}
						handleChange={handleChange}
						handleEmail={handleEmail}
						hideButton={(task.status === 'completed' && task.assigned_stakeholder !== 'system')
							|| (selectedTaskId.length)}
						tasksList={tasksList}
					/>
				)}

				<UpdateAction
					task={task}
					hideThreeDots={task.status === 'completed'}
				/>
			</div>

			{showEmailModal && (
				<ViewEmailContent
					taskId={task?.id}
					taskName={task?.label}
					onCancel={() => setShowEmialModal(false)}
					showEmailModal={showEmailModal}
				/>
			)}
		</div>
	);
}

export default Card;
