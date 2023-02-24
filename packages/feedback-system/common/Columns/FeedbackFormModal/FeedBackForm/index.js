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
import EmptyState from '../../../EmptyState';

import styles from './styles.module.css';

const performanceIcons = {
	below_expectations   : <IcMArrowDoubleDown height={20} width={20} fill="#ee3425" />,
	needs_improvement    : <IcMArrowDown height={20} width={20} fill="#f68b21" />,
	meets_expectations   : <div className={styles.constant}>H</div>,
	exceeds_expectations : <IcMArrowUp height={20} width={20} fill="#abcd62" />,
	outstanding          : <IcCStar height={20} width={20} fill="#fcdc00" />,
};

function FeedBackForm({
	action = '',
	setShowForm = () => {},
	questionsToShow = [],
	form_id = '',
	rating,
	comment,
	setComment = () => {},
	setRating = () => {},
	questionsLoading = false,
	userId = '',
	setRefetchReportees = () => {},
}) {
	const { onSubmitData, loading = false } = useCreateUserFeedback({
		rating,
		comment,
		formId: form_id,
		userId,
		setShowForm,
		setRefetchReportees,
	});

	const onSubmit = () => {
		if (Object.values(rating).includes(0) || isEmpty(comment)) {
			Toast.error('Please provide rating for all the parameters');
			return;
		}
		onSubmitData();
	};

	const newOptions = Array(5).fill('').map((_, index) => ({
		label : '',
		value : (index + 1),
		...(action === 'show' ? { disabled: true } : {}),
	}));

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

	if (isEmpty([]) && !questionsLoading) {
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

				<div className={styles.rating_classes}>
					{Object.keys(performanceClass).map((key) => (
						<div className={styles.class}>
							{performanceClass[key]}
						</div>
					))}
				</div>
			</div>

			{(questionsToShow || []).map((key) => {
				const { id, question, description = '', feedback = '' } = key || {};

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
									value={action === 'show' ? rating[id] : rating[id]?.rating}
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
					disabled={action === 'show'}
					placeholder="Specify the overall feedback."
					onChange={setComment}
					style={{ height: '80px' }}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="secondary"
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
