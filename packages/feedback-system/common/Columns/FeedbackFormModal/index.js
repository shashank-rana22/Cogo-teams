import { Button, Modal } from '@cogoport/components';
import { IcMEdit, IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListFeedbackQuestions from '../../../hooks/useListFeedbackQuestions';

import FeedBackForm from './FeedBackForm';
import styles from './styles.module.css';

function FeedbackFormModal({
	userId = '',
	performanceItem = {},
	feedbackId = '',
	feedback = '',
	getTeamFeedbackList = () => {},
}) {
	const [addFeedback, setAddFeedback] = useState(false);
	const [newFeedbackId, setNewFeedbackId] = useState(feedbackId);
	const [rating, setRating] = useState({ ...performanceItem });
	const [comment, setComment] = useState(feedback);

	const { feedbackData, loading, getQuestionList: getQuestionDetails = () => {} } = useListFeedbackQuestions({
		userId,
		status: 'active',
	});

	const onCloseFunction = () => {
		setAddFeedback(false);
		getTeamFeedbackList();
	};

	return (
		<>
			<div
				className={styles.add_button}
				role="button"
				tabIndex={0}
				onClick={() => {
					getQuestionDetails();
					setAddFeedback(true);
				}}
			>

				<Button themeType="accent">
					{isEmpty(newFeedbackId) ? (
						<>
							<IcMPlusInCircle width={16} height={16} fill="#393F70" />
							ADD
						</>

					) : (
						<>
							<IcMEdit width={14} height={14} fill="#393f70" />
							EDIT
						</>
					)}
				</Button>

			</div>

			<Modal
				show={addFeedback}
				onClose={() => onCloseFunction()}
				size="xl"
				onOuterClick={() => onCloseFunction()}
			>
				<FeedBackForm
					feedbackData={feedbackData}
					userId={userId}
					rating={rating}
					comment={comment}
					loading={loading}
					newFeedbackId={newFeedbackId}
					setNewFeedbackId={setNewFeedbackId}
					setComment={setComment}
					setShowForm={setAddFeedback}
					setRating={setRating}
				/>
			</Modal>
		</>
	);
}

export default FeedbackFormModal;
