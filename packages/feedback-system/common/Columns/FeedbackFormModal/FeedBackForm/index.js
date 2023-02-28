import {
	Modal,
	Button,
	RadioGroup,
	Placeholder,
	Textarea,
	Toast,
	Tooltip,
} from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import performanceIcons from '../../../../constants/performance-icon-mappings';
import useCreateUserFeedback from '../../../../hooks/useCreateUserFeedback';
import useGetForm from '../../../../hooks/useGetForm';
import EmptyState from '../../../EmptyState';

import styles from './styles.module.css';

function FeedBackForm({
	action = '',
	item = {},
	showForm = false,
	setShowForm = () => {},
	userId = '',
	setRefetchReportees = () => {},
}) {
	const {
		formData = {},
		loading: questionsLoading = false,
	} = useGetForm({
		item, action, showForm,
	});

	const { form_questions = [], form_id = '', form_responses = [], feedback_data = {} } = formData;

	const questionsToShow = action === 'show' ? form_responses : form_questions;

	const [rating, setRating] = useState({});
	const [comment, setComment] = useState(feedback_data.feedback);

	const { onSubmitData, loading = false } = useCreateUserFeedback({
		rating,
		comment,
		formId: form_id,
		userId,
		setShowForm,
		setRefetchReportees,
	});

	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

	const onSubmit = () => {
		if (Object.values(rating).includes(0) || (showForm !== 'resigned' || isEmpty(comment))) {
			Toast.error('Please provide rating for all the questions');
			return;
		}
		setOpenConfirmationModal(true);
	};

	const newOptions = Array(5).fill('').map((_, index) => ({
		label : '',
		value : (index + 1).toString(),
		...(action === 'show' ? { disabled: true } : {}),
	}));

	const resignedOptions = [{
		label : 'yes',
		value : '1',
		...(action === 'show' ? { disabled: true } : {}),
	}, {
		label : 'no',
		value : '0',
		...(action === 'show' ? { disabled: true } : {}),
	}];

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

	const loadArr = [1, 2, 3, 4, 5];

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

			<div className={styles.header}>
				<div className={`${styles.side_heading} ${styles.column}`}>Questions</div>

				{showForm !== 'resigned' && (
					<div className={styles.rating_classes}>
						{Object.keys(performanceClass).map((key) => (
							<div className={styles.class}>
								{performanceClass[key]}
							</div>
						))}
					</div>
				)}

			</div>

			{(questionsToShow || []).map((key) => {
				const { id, question, rating: pastRating = '', description = '', feedback = '' } = key || {};
				if (showForm === 'resigned') {
					return (
						<div
							className={styles.controls}
							key={id || question}
						>
							<div className={styles.question_rating}>
								<div className={styles.side_heading}>
									<div className={styles.question_container}>{startCase(question)}</div>

									<Tooltip
										placement="top"
										theme="light"
										animation="shift-away"
										content={<div>{description}</div>}
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
										options={resignedOptions}
										value={pastRating.toString() || rating[id]?.rating}
										onChange={(val) => {
											if (action !== 'show') {
												setRating({ ...rating, [id]: { ...(rating[id]), rating: val } });
											}
										}}
									/>
								</div>
							</div>
						</div>
					);
				}

				return (
					<div
						className={styles.controls}
						key={id || question}
					>
						<div className={styles.question_rating}>
							<div className={styles.side_heading}>
								<div className={styles.question_container}>{startCase(question)}</div>

								<Tooltip
									placement="top"
									theme="light"
									animation="shift-away"
									content={<div>{description}</div>}
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
									options={newOptions}
									value={pastRating.toString() || rating[id]?.rating}
									onChange={(val) => {
										if (action !== 'show') {
											setRating({ ...rating, [id]: { ...(rating[id]), rating: val } });
										}
									}}
								/>
							</div>
						</div>

						<div className={styles.question_feedback}>
							<Textarea
								value={feedback || rating[id]?.feedback}
								disabled={action === 'show'}
								onChange={(val) => {
									setRating({ ...rating, [id]: { ...(rating[id]), feedback: val } });
								}}
								placeholder={action === 'show' && isEmpty(feedback)
									? 'No Feedback Provided' : 'Convey the reason for feedback...'}
								style={{ height: '60px' }}
							/>
						</div>
					</div>
				);
			})}

			{showForm !== 'resigned' && (

				<div className={styles.feedback_comment}>
					<div className={styles.comment}>Your Feedback</div>

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
					onClick={onSubmit}
				>
					Submit
				</Button>
			</div>

			{openConfirmationModal
			&& (
				<Modal show={openConfirmationModal} onClose={() => setOpenConfirmationModal(false)}>
					<Modal.Header title="Are you sure?" />
					<Modal.Body style={{ border: 'none' }}>
						<div>
							This is the one time action per month, per user.
							Are you sure about the feedback you gave?
						</div>
					</Modal.Body>
					<Modal.Footer style={{ boxShadow: 'none' }}>
						<Button
							themeType="tertiary"
							onClick={() => setOpenConfirmationModal(false)}
							style={{ marginRight: '8px' }}
						>
							No
						</Button>

						<Button
							onClick={() => onSubmitData({ setOpenConfirmationModal })}
							loading={loading}
						>
							Yes
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</div>
	);
}

export default FeedBackForm;
