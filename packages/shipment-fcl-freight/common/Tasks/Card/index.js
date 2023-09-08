import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';
import TaskDetails from './TaskDetails';
import UpdateAction from './UpdateAction';
import UpdateButton from './UpdateButton';
import ViewEmailContent from './ViewEmailContent';

function Card({
	task = {},
	handleClick = () => {},
	selectedTaskId = '',
	isTaskOpen = false,
	tasksList = [],
}) {
	const [showEmailModal, setShowEmailModal] = useState(false);

	const handleChange = (newMails) => {
		handleClick(task, newMails);
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
						handleEmail={() => setShowEmailModal(true)}
						hideButton={(task?.status === 'completed' && task?.assigned_stakeholder !== 'system')
							|| (!isEmpty(selectedTaskId))}
						tasksList={tasksList}
					/>
				)}

				<UpdateAction
					task={task}
					hideThreeDots={task?.status === 'completed'}
				/>
			</div>

			{showEmailModal ? (
				<ViewEmailContent
					taskId={task?.id}
					taskName={task?.label}
					onCancel={() => setShowEmailModal(false)}
					showEmailModal={showEmailModal}
				/>
			) : null}
		</div>
	);
}

export default Card;
