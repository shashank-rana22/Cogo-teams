import {
	Button,
	RadioGroup,
	Placeholder,
	TextArea,
	toast,
	Tooltip,
} from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

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
			toast.error('Please provide rating for all the parameters');
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

	const performanceRating = [
		'Below Expectations',
		'Needs Improvement',
		'Meets Expectations',
		'Exceeds Expectations',
		'Outstanding',
	];

	const onChange = (e) => {
		setComment(e.target.value);
	};

	const content = (remark) => `${remark}`;

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

	if (feedbackQuestionList.length === 0 && !questionsLoading) {
		return <EmptyState />;
	}

	return (
		<div className={styles.form_container}>
			<div className={styles.heading}>
				<div className={styles.header}>
					<div className={styles.side_heading}>Questions</div>

					{performanceRating.map((key) => <div className={styles.rating}>{key}</div>)}
				</div>
			</div>

			{(feedbackQuestionList || []).map((key) => {
				const { question, remark } = key || {};
				return (
					<div className={styles.controls}>
						<div className={styles.side_heading}>
							<div className={styles.question_container}>{question}</div>

							<Tooltip
								placement="top"
								theme="light"
								animation="shift-away"
								render={content(remark)}
							>
								<div
									role="button"
									tabIndex={0}
									style={{ paddingTop: '5px', paddingLeft: '5px' }}
								>
									<IcMInfo
										fill="#393f70"
										width={16}
										height={16}
										type="button"
									/>
								</div>
							</Tooltip>
						</div>

						<RadioGroup
							className="primary md"
							options={options}
							value={rating[question]}
							onChange={(item) => {
								setRating({ ...rating, [question]: item });
							}}
						/>
					</div>
				);
			})}

			<div className={styles.feedback_content}>
				<div className={styles.comment}>Your Feedback</div>

				<TextArea
					themeType="large"
					value={comment}
					placeholder="Type your feedback here ..."
					onChange={onChange}
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
				>
					Reset
				</Button>

				<Button
					size="md"
					themeType="accent"
					loading={loading}
					onClick={() => {
						onSubmit();
					}}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default FeedBackForm;
