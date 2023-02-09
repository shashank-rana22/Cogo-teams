import { Tooltip } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';

import QuestionsBox from '../../../../common/QuestionsBox';

import styles from './styles.module.css';

function Questions({
	data,
	feedbackQuestionId = '',
	setEditIndexId = () => {},
	setDeleteItemId = () => {},
	setConfirmDelete = () => {},
	setEditItem = () => {},
	setConfirmEdit = () => {},
}) {
	const deleteItem = (feedbackQuestionId1) => {
		setDeleteItemId(feedbackQuestionId1);
		setConfirmDelete(true);
	};

	const editItem = (newData, feedbackQuestionId1) => {
		setEditItem(newData);
		setEditIndexId(feedbackQuestionId1);
		setConfirmEdit(true);
	};
	return (
		<div className={styles.question_section}>
			<div className={styles.question_details_container}>
				<QuestionsBox question_detail={data} />
			</div>
			<div className={styles.icon_container}>
				<div>
					<IcMEdit
						width={20}
						height={20}
						fill="#393F70"
						style={{
							fontWeight : '100',
							cursor     : 'pointer',
							margin     : '0 16px',
						}}
						onClick={() => editItem(data, feedbackQuestionId)}
					/>

				</div>

				<Tooltip
					theme="light"
					placement="bottom-end"
					animation="shift-away"
					content="Deleting this, will delete the current question"
				>
					<div>
						<IcMDelete
							width={20}
							height={20}
							fill="#393F70"
							style={{
								fontWeight : '100',
								cursor     : 'pointer',
							}}
							onClick={() => deleteItem(feedbackQuestionId)}
						/>
					</div>
				</Tooltip>
			</div>
		</div>
	);
}

export default Questions;
