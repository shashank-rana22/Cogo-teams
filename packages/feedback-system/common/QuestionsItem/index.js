import { Button, Pagination, Input, Tooltip, Checkbox } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { cloneDeep } from '@cogoport/utils';

import QuestionsBox from '../QuestionsBox';

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
				checked : [...(pv.checked || []), item],
				weigh   : [...(pv.weigh || []), item],
			}));
			return;
		}
		setQuestionActionList((pv) => {
			const newCheckedList = pv.checked?.filter((question) => question.id !== item.id);
			const newWeighList = pv.weigh?.filter(((question) => question.id !== item.id));
			return { ...pv, checked: newCheckedList, weigh: newWeighList };
		});
	};

	const deleteItem = (questionItem) => {
		setQuestionActionList((pv) => ({ ...pv, delete: questionItem }));
	};

	const editItem = (questionItem) => {
		setQuestionActionList((pv) => ({ ...pv, edit: questionItem }));
	};

	const setQuestionWeightage = (weight) => {
		setQuestionActionList((pv) => {
			const newList = [];

			pv.weigh?.forEach((question) => {
				if (question.id === item.id) {
					newList.push({ ...question, weightage: weight });
					return;
				}
				newList.push(question);
			});

			return { ...pv, weigh: newList };
		});
	};

	const changeOrder = (p) => {
		setQuestionActionList((pv) => {
			const weighList = cloneDeep(pv.weigh);

			[weighList[p - 1], weighList[index]] = [weighList[index], weighList[p - 1]];

			return { ...pv, weigh: weighList };
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

			{questionStatus === 'add_weightage' ? (
				<div className={styles.weightage}>
					<p className={styles.label}>Weightage</p>
					<Input
						value={item.weightage}
						onChange={(val) => setQuestionWeightage(val)}
						type="number"
						placeholder="Set Weightage.."
					/>
				</div>
			) : (
				<div className={styles.icon_container}>
					<Button disabled themeType="tertiary" onClick={() => editItem(item)}>
						<IcMEdit
							width={20}
							height={20}
							fill="#393F70"
							style={{
								fontWeight : '100',
								cursor     : 'pointer',
								margin     : '0 16px',
							}}
						/>

					</Button>

					<Tooltip
						theme="light"
						placement="bottom-end"
						animation="shift-away"
						content="Deleting this, will delete the current question"
					>
						<Button disabled themeType="tertiary" onClick={() => deleteItem(item)}>
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
			)}

		</div>
	);
}

export default QuestionsItem;
