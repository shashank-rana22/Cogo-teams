import {
	Button,
	RadioGroup,
	Placeholder,
	Textarea,
	Toast,
	Tooltip,
} from '@cogoport/components';
import { IcCStar, IcMArrowDoubleDown, IcMArrowDown, IcMArrowUp, IcMInfo } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import useCreateUserFeedback from '../../../../hooks/useCreateUserFeedback';
import useListFeedbackQuestions from '../../../../hooks/useListFeedbackQuestions';
import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function FeedBackForm({
	showForm = 'false',
	setShowForm = () => {},
	rating,
	comment,
	newFeedbackId,
	setNewFeedbackId = () => {},
	setComment = () => {},
	setRating = () => {},
	userId = '',
}) {
	const {
		feedbackData = {},
		loading: questionsLoading = false,
	} = useListFeedbackQuestions({
		userId,
		status       : 'active',
		showQuestion : showForm,
	});

	const { list: feedbackQuestionList = [] } = feedbackData || {};

	const { onSubmitData, loading = false } = useCreateUserFeedback({
		rating,
		comment,
		userId,
		newFeedbackId,
		setNewFeedbackId,
		setShowForm,
	});

	const onSubmit = () => {
		if (Object.values(rating).includes(0) || isEmpty(comment)) {
			Toast.error('Please provide rating for all the parameters');
		} else return onSubmitData();

		return null;
	};

	const options = [
		{ label: '', value: '1' },
		{ label: '', value: '2' },
		{ label: '', value: '3' },
		{ label: '', value: '4' },
		{ label: '', value: '5' },
	];

	const performanceIcons = {
		below_expectations   : <IcMArrowDoubleDown height={20} width={20} fill="#ee3425" />,
		needs_improvement    : <IcMArrowDown height={20} width={20} fill="#f68b21" />,
		meets_expectations   : <div className={styles.constant}>H</div>,
		exceeds_expectations : <IcMArrowUp height={20} width={20} fill="#abcd62" />,
		outstanding          : <IcCStar height={20} width={20} fill="#fcdc00" />,
	};

	const performanceClass = {};

	Object.keys(performanceIcons).forEach((key) => {
		performanceClass[key] = (
			<Tooltip
				placement="top"
				theme="light"
				animation="shift-away"
				content={<div>{startCase(key)}</div>}
			>
				{performanceIcons[key]}
			</Tooltip>
		);
	});

	const onChange = (e) => {
		setComment(e.target.value);
	};

	if (questionsLoading) {
		return (
			<div className={styles.loading_state}>
				<Placeholder width="100%" height="60px" />
				<Placeholder width="100%" height="60px" />
				<Placeholder width="100%" height="60px" />
				<Placeholder width="100%" height="60px" />
				<Placeholder width="100%" height="60px" />
			</div>
		);
	}

	// if (feedbackQuestionList.length === 0 && !questionsLoading) {
	// 	return <EmptyState />;
	// }

	const questions = [{ id: 1, question: 'where are you now? where are you now? where are you now? where are you now? where are you now? where are you now? where are you now?', remark: 'how are you?', weightage: 20 },
		{ id: 2, question: 'where are you now?', remark: 'how are you?', weightage: 20 },
		{ id: 3, question: 'where are you now?', remark: 'how are you?', weightage: 20 },
		{ id: 4, question: 'where are you now?', remark: 'how are you?', weightage: 20 },
		{ id: 5, question: 'where are you now?', remark: 'how are you?', weightage: 20 }];

	return (
		<div className={styles.form_container}>

			<div className={styles.header}>
				<div className={`${styles.side_heading} ${styles.column}`}>Questions</div>

				<div className={styles.rating_classes}>
					{Object.keys(performanceClass).map((key) => (
						<div className={styles.class}>
							{performanceClass[key]}
						</div>
					))}
				</div>
			</div>

			{(questions || []).map((key) => {
				const { id, question, remark } = key || {};
				return (
					<div
						className={styles.controls}
					>
						<div className={styles.question_rating}>
							<div className={styles.side_heading}>
								<div className={styles.question_container}>{startCase(question)}</div>

								<Tooltip
									placement="top"
									theme="light"
									animation="shift-away"
									content={<div>{remark}</div>}
								>
									<IcMInfo
										fill="#393f70"
										width={16}
										height={16}
									/>
								</Tooltip>
							</div>

							<div className={styles.radio_group}>
								<RadioGroup
									options={options}
									value={rating[id]?.rating}
									onChange={(item) => {
										setRating({ ...rating, [id]: { ...(rating[id]), rating: item } });
									}}
								/>
							</div>
						</div>

						<div className={styles.question_feedback}>
							<Textarea
								value={rating[id]?.reason}
								onChange={(val) => {
									setRating({ ...rating, [id]: { ...(rating[id]), reason: val } });
								}}
								placeholder="Convey the reason for feedback..."
								style={{ height: '60px' }}
							/>
						</div>
					</div>
				);
			})}

			<div className={styles.feedback_comment}>
				<div className={styles.comment}>Your Feedback</div>

				<Textarea
					size="lg"
					value={comment}
					placeholder="Specify the overall feedback."
					onChange={onChange}
					style={{ height: '80px' }}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
					disabled={loading}
					onClick={() => {
						setRating({});
						setComment('');
					}}
					style={{ marginRight: '8px' }}
				>
					Reset
				</Button>

				<Button
					size="md"
					themeType="accent"
					loading={loading}
					onClick={onSubmit}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default FeedBackForm;
