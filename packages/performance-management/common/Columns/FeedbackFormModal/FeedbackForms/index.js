import {
	Button,
	RadioGroup,
	Placeholder,
	Textarea,
	Tooltip,
} from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import performanceIcons from '../../../../constants/performance-icon-mappings';
import useCreateUserFeedback from '../../../../hooks/useCreateUserFeedback';
import useGetForm from '../../../../hooks/useGetForm';
import EmptyState from '../../../EmptyState';

import styles from './styles.module.css';

function FeedbackForms({
	action = '',
	item = {},
	showForm = '',
	feedback_id = '',
	setShowForm = () => {},
	userId = '',
	setRefetchReportees = () => {},
	feedbackMonth = '',
	feedbackYear = '',
}) {
	const {
		formData = {},
		loading: questionsLoading = false,
	} = useGetForm({
		item,
		action,
		showForm,
		feedback_id,
		feedbackMonth,
		feedbackYear,
	});

	const { form_id = '' } = formData;

	const [rating, setRating] = useState({});
	const [comment, setComment] = useState('');
	const [questionsToShow, setQuestionsToShow] = useState([]);

	const { onSubmit, loading = false } = useCreateUserFeedback({
		rating,
		comment,
		formId: form_id,
		userId,
		setShowForm,
		setRefetchReportees,
		feedback_id,
		feedbackMonth,
		feedbackYear,
	});

	const newOptions = Array(5).fill('').map((_, index) => ({
		label : '',
		value : (index + 1).toString(),
		...(action === 'show' && { disabled: true }),
	}));

	const resignedOptions = [
		{
			label : 'Yes',
			value : '2',
			...(action === 'show' && { disabled: true }),
		}, {
			label : 'No',
			value : '1',
			...(action === 'show' && { disabled: true }),
		},
	];

	const performanceClass = {};

	Object.keys(performanceIcons).forEach((key) => {
		performanceClass[key] = (
			<Tooltip
				placement="top"
				theme="light"
				animation="shift-away"
				content={<div style={{ wordBreak: 'break-word' }}>{startCase(key || '-')}</div>}
			>
				{performanceIcons[key]}
			</Tooltip>
		);
	});

	const loadArr = [1, 2, 3, 4, 5];

	useEffect(() => {
		if (!isEmpty(formData)) {
			const { form_questions = [], form_responses = [], feedback_data = {} } = formData;

			const questions = !isEmpty(form_responses) ? form_responses : form_questions;

			if (!isEmpty(form_responses)) {
				const pastRating = {};

				(form_responses || []).forEach((res) => {
					pastRating[res.id] = {
						rating   : res.rating?.toString(),
						feedback : res.feedback,
					};
				});
				setComment(feedback_data.feedback);
				setRating(pastRating);
			}
			setQuestionsToShow(questions);
		}
	}, [formData]);

	if (questionsLoading) {
		return (
			<div className={styles.loading_state}>
				{loadArr.map((i) => <Placeholder width="100%" height="60px" key={i} />)}
			</div>
		);
	}

	if (isEmpty(questionsToShow)) {
		return (
			<EmptyState
				height="60%"
				width="50%"
				emptyText="No form for this role yet..."
				flexDirection="row"
				textSize="16px"
			/>
		);
	}

	return (
		<div className={styles.form_container}>
			{showForm !== 'resigned' && (
				<div className={styles.header}>
					<div className={`${styles.side_heading} ${styles.column}`}>Questions</div>

					<div className={styles.rating_classes}>
						{Object.keys(performanceClass).map((key) => (
							<div className={styles.performance_class} key={key}>
								{performanceClass[key]}
							</div>
						))}
					</div>

				</div>
			)}

			{(questionsToShow || []).map((key) => {
				const { id, question, description = '' } = key || {};

				return (
					<div
						className={styles.controls}
						key={id || question}
					>
						<div className={styles.question_rating}>
							<div className={styles.side_heading}>
								<div className={styles.question_container}>{startCase(question || '---')}</div>

								{!!description && (
									<Tooltip
										placement="top"
										theme="light"
										animation="shift-away"
										content={<div style={{ wordBreak: 'break-word' }}>{description}</div>}
									>
										<IcMInfo
											fill="#393f70"
											width={16}
											height={16}
										/>
									</Tooltip>
								)}
							</div>

							<div className={styles.radio_group}>
								<RadioGroup
									options={showForm === 'resigned' ? resignedOptions : newOptions}
									value={rating[id]?.rating}
									onChange={(val) => {
										if (action !== 'show') {
											setRating({ ...rating, [id]: { ...(rating[id]), rating: val } });
										}
									}}
								/>
							</div>
						</div>

						{showForm !== 'resigned' && (
							<div className={styles.question_feedback}>
								<Textarea
									value={rating[id]?.feedback}
									disabled={action === 'show'}
									onChange={(val) => {
										setRating({ ...rating, [id]: { ...(rating[id]), feedback: val } });
									}}
									placeholder={action === 'show' && isEmpty(rating[id].feedback)
										? 'No Feedback Provided' : 'Convey the reason for feedback...'}
									style={{ height: '60px' }}
								/>
							</div>
						)}
					</div>
				);
			})}

			{showForm !== 'resigned' && (

				<div className={styles.feedback_comment}>
					<div className={styles.comment}>
						Overall Feedback
						{' '}
						<span>(This will be shown to the reportee)</span>
					</div>

					<Textarea
						size="lg"
						value={comment}
						disabled={action === 'show'}
						placeholder="Specify the overall feedback."
						onChange={setComment}
						style={{ height: '80px' }}
					/>
				</div>
			)}

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="tertiary"
					disabled={loading || action === 'show'}
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
					themeType="primary"
					disabled={action === 'show'}
					onClick={() => onSubmit({ questionsToShow, showForm })}
				>
					Submit
				</Button>
			</div>

		</div>
	);
}

export default FeedbackForms;
