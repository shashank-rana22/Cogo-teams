import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { useStakeholderCheck } from '../../../hooks/useStakeholderCheck';

import styles from './styles.module.css';
import TaskDetails from './TaskDetails';
import UpdateAction from './UpdateAction';
import UpdateButton from './UpdateButton';
import ViewEmailContent from './ViewEmailContent';

const CAN_CHANGE_OWNER = ['admin', 'superadmin'];

function Card({
	task = {},
	handleClick = () => {},
	selectedTaskId = '',
	isTaskOpen = false,
	tasksList = [],
}) {
	const [showEmailModal, setShowEmailModal] = useState(false);

	const { activeStakeholder } = useStakeholderCheck();

	const hideThreeDots = (task?.status === 'completed' || !CAN_CHANGE_OWNER.includes(activeStakeholder));

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
					hideThreeDots={hideThreeDots}
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
