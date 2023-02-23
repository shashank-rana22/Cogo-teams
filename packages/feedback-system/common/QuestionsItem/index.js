import { Button, Pagination, Input, Tooltip, Checkbox } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { cloneDeep } from '@cogoport/utils';

import QuestionsBox from './QuestionsBox';
import styles from './styles.module.css';

function QuestionsItem({
	item,
	index,
	// feedbackQuestionId = '',
	setQuestionActionList = () => {},
	isChecked = false,
	questionStatus = '',
	totalCount = '',
}) {
	const onCheckUncheck = (val) => {
		if (!val) {
			setQuestionActionList((pv) => ({
				...pv,
				checked: [...(pv.checked || []), item],
			}));
			return;
		}
		setQuestionActionList((pv) => {
			const newCheckedList = pv.checked?.filter((question) => question.id !== item.id);
			return { ...pv, checked: newCheckedList };
		});
	};

	const undoAdd = (questionItem) => {
		setQuestionActionList((pv) => {
			const newChecked = pv.checked.filter((que) => que.id !== questionItem.id);
			return { ...pv, checked: newChecked };
		});
	};

	const setQuestionWeightage = (weight) => {
		setQuestionActionList((pv) => {
			const newList = [];

			pv.checked?.forEach((question) => {
				if (question.id === item.id) {
					newList.push({ ...question, weightage: weight });
					return;
				}
				newList.push(question);
			});

			return { ...pv, checked: newList };
		});
	};

	const changeOrder = (p) => {
		setQuestionActionList((pv) => {
			const checkedList = cloneDeep(pv.checked);

			[checkedList[p - 1], checkedList[index]] = [checkedList[index], checkedList[p - 1]];

			return { ...pv, checked: checkedList };
		});
	};

	return (
		<div className={styles.container}>
			{questionStatus === 'add_weightage' ? (
				<div className={styles.order_container}>
					<Pagination
						type="compact"
						currentPage={index + 1}
						totalItems={totalCount}
						pageSize={1}
						onPageChange={changeOrder}
					/>
				</div>
			) : (
				<div className={styles.checkbox_container}>
					<Checkbox
						checked={isChecked}
						onChange={() => {
							onCheckUncheck(isChecked);
						}}
					/>
				</div>
			) }

			<div className={styles.question_container}>
				<QuestionsBox question_detail={item} questionStatus={questionStatus} />
			</div>

			{questionStatus === 'add_weightage' && (
				<>
					<div className={styles.weightage}>
						<p className={styles.label}>Weightage</p>
						<Input
							value={item.weightage}
							onChange={(val) => setQuestionWeightage(val)}
							type="number"
							placeholder="Set Weightage.."
						/>
					</div>
					<div className={styles.icon_container}>

						<Tooltip
							theme="light"
							placement="bottom-end"
							animation="shift-away"
							content="This will remove the question from this form.."
						>
							<Button themeType="tertiary" onClick={() => undoAdd(item)}>
								<IcMDelete
									width={20}
									height={20}
									fill="#393F70"
									style={{
										fontWeight : '100',
										cursor     : 'pointer',
									}}
								/>
							</Button>
						</Tooltip>
					</div>
				</>
			)}

		</div>
	);
}

export default QuestionsItem;
