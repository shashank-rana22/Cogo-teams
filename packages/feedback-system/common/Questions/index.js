import { Tooltip, Checkbox } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import QuestionsBox from '../QuestionsBox';

import styles from './styles.module.css';

function Questions({
	item,
	type = 'previous',
	index = '',
	setIsCheckedAll = () => {},
	setPreviousQuestions = () => {},
	feedbackQuestionId = '',
	setChangeQuestions = () => {},
}) {
	const {
		question,
		remark,
		weight,
		id: feedback_question_id = '',
	} = item || {};
	const [checked, setIscheched] = useState(false);

	const deleteItem = (feedbackQuestionId1) => {
		setChangeQuestions((pv) => ({ ...pv, delete: { feedback_question_id: feedbackQuestionId1 } }));
	};

	const editItem = (feedbackQuestionId1) => {
		setChangeQuestions((pv) => ({ ...pv, edit: { feedback_question_id: feedbackQuestionId1 } }));
	};

	return (
		<div className={styles.container}>
			{type === 'previous' && (
				<div className={styles.checkbox_container}>
					<Checkbox
						checked={checked}
						onChange={() => {
							setIscheched(!checked);
							setIsCheckedAll((pv) => ({ ...pv, [index]: !checked }));
							setPreviousQuestions((pv) => ({
								...pv,
								[index]: {
									question,
									remark,
									weight,
									feedback_question_id,
									status: 'active',
								},
							}));
						}}
					/>
				</div>
			)}

			<div className={styles.question_container}>
				<QuestionsBox question_detail={item} />
			</div>

			{type === 'current' && (
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
							onClick={() => editItem(feedbackQuestionId)}
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
			)}

		</div>
	);
}

export default Questions;
