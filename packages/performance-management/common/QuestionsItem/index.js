import { ButtonIcon, Input, Tooltip, Checkbox } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { cloneDeep } from '@cogoport/utils';

import OrderComponent from './OrderComponent';
import QuestionsBox from './QuestionsBox';
import styles from './styles.module.css';

function QuestionsItem({
	item,
	index,
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
		} else {
			setQuestionActionList((pv) => {
				const newCheckedList = pv.checked?.filter((question) => question.id !== item.id);
				return { ...pv, checked: newCheckedList };
			});
		}
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
					newList.push({ ...question, weightage: Math.round(weight) });
				} else {
					newList.push(question);
				}
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
				<div className={styles.order_container} style={{ width: '5%' }}>
					<OrderComponent
						type="compact"
						currentPage={index + 1}
						totalItems={totalCount}
						pageSize={1}
						onPageChange={changeOrder}
					/>
				</div>
			) : (
				<div className={styles.checkbox_container} style={{ width: '5%' }}>
					<Checkbox
						checked={isChecked}
						onChange={() => {
							onCheckUncheck(isChecked);
						}}
					/>
				</div>
			) }

			<div
				className={styles.question_container}
				style={{ width: questionStatus === 'add_weightage' ? '60%' : '95%' }}
			>
				<QuestionsBox question_detail={item} questionStatus={questionStatus} />
			</div>

			{questionStatus === 'add_weightage' && (
				<>
					<div className={styles.weightage}>
						<p className={styles.label}>Weightage</p>
						<Input
							value={Math.round(item.weightage)}
							onChange={(val) => setQuestionWeightage(val)}
							type="number"
							placeholder="Set Weightage.."
							min={0}
						/>
					</div>
					<div className={styles.icon_container} style={{ width: '10%' }}>

						<Tooltip
							theme="light"
							placement="bottom-end"
							animation="shift-away"
							content={(
								<div
									style={{ wordBreak: 'break-word' }}
								>
									This will remove the question from this form..
								</div>
							)}
						>
							<ButtonIcon themeType="primary" icon={<IcMDelete />} onClick={() => undoAdd(item)} />
						</Tooltip>
					</div>
				</>
			)}

		</div>
	);
}

export default QuestionsItem;
