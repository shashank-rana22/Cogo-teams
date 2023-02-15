import { Tooltip, Checkbox } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';

import QuestionsBox from '../QuestionsBox';

import styles from './styles.module.css';

function QuestionsItem({
	item,
	feedbackQuestionId = '',
	setQuestionActionList = () => {},
	isChecked = false,
}) {
	const onCheckUncheck = (val) => {
		if (!val) {
			setQuestionActionList((pv) => ({ ...pv, checked: [...(pv.checked || []), item] }));
			return;
		}
		setQuestionActionList((pv) => {
			const newCheckedList = pv.checked?.filter((question) => question.id !== item.id);
			return { ...pv, checked: newCheckedList };
		});
	};

	const deleteItem = (questionItem) => {
		setQuestionActionList((pv) => ({ ...pv, delete: questionItem }));
	};

	const editItem = (questionItem) => {
		setQuestionActionList((pv) => ({ ...pv, edit: questionItem }));
	};

	return (
		<div className={styles.container}>
			<div className={styles.checkbox_container}>
				<Checkbox
					checked={isChecked}
					onChange={() => {
						onCheckUncheck(isChecked);
					}}
				/>
			</div>

			<div className={styles.question_container}>
				<QuestionsBox question_detail={item} />
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
						onClick={() => editItem(feedbackQuestionId)}
					/>

				</div>

				<Tooltip
					theme="light"
					placement="bottom-end"
					animation="shift-away"
					content="Deleting this, will delete the current question"
				>
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
				</Tooltip>
			</div>

		</div>
	);
}

export default QuestionsItem;
