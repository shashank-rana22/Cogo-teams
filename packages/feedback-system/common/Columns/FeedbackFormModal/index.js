import { Button, Modal } from '@cogoport/components';
import { IcMEdit, IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty, addDays, startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetForm from '../../../utils/useGetForm';

import FeedBackForm from './FeedBackForm';
import styles from './styles.module.css';

const getSaturday = (date) => {
	date.setDate(1);
	while (date.getDay() !== 6) {
		date.setDate(date.getDate() + 1);
	}
	return date;
};

function FeedbackFormModal({
	item = {},
	getTeamFeedbackList = () => {},
}) {
	const {
		user_id:userId = '',
		performance_item: performanceItem = {}, feedback = '', form_id:feedbackId = '',
		department, designation,
	} = item;

	const {
		formData = {},
		loading: questionsLoading = false,
	} = useGetForm({
		department, designation,
	});

	const { form_questions = [], form_id = '' } = formData;

	const [addFeedback, setAddFeedback] = useState(false);
	const [newFeedbackId, setNewFeedbackId] = useState(feedbackId);
	const [rating, setRating] = useState({ ...performanceItem });
	const [comment, setComment] = useState(feedback);

	const onCloseFunction = () => {
		setAddFeedback(false);
		getTeamFeedbackList();
	};

	const currentDate = new Date();

	const firstSaturday = getSaturday(currentDate);

	const timeAfterTwoDays = addDays(firstSaturday, 2);

	// if (!(currentDate > firstSaturday && currentDate < timeAfterTwoDays)) {
	// 	return (
	// 		<div className={styles.feedback_button}>
	// 			<Button className={styles.feedback_form_button} disabled>
	// 				<IcMEdit style={{ marginRight: '4px' }} width={14} height={14} fill="#393f70" />
	// 				<p className={styles.feedback_button_text}>
	// 					EDIT
	// 				</p>
	// 			</Button>
	// 		</div>
	// 	);
	// }

	return (
		<div className={styles.feedback_button}>
			<div className={styles.add_button}>
				<Button
					size="sm"
					themeType="accent"
					disabled={isEmpty(form_questions)}
					onClick={() => 	setAddFeedback(true)}
				>
					{isEmpty(newFeedbackId) ? (
						<>
							<IcMPlusInCircle style={{ marginRight: '4px' }} width={16} height={16} />
							ADD
						</>
					) : (
						<>
							<IcMEdit style={{ marginRight: '4px' }} width={14} height={14} />
							EDIT
						</>
					)}
				</Button>
			</div>

			{addFeedback && (
				<Modal
					show={addFeedback}
					onClose={() => onCloseFunction()}
					size="xl"
					onClickOutside={() => onCloseFunction()}
				>
					<Modal.Header title={(
						<div className={styles.modal_header}>
							Feedback Form For :
							<span>
								{' '}
								{startCase(item.name)}
							</span>
						</div>
					)}
					/>

					<Modal.Body style={{ padding: '0px', maxHeight: '60vh' }}>
						<FeedBackForm
							item={item}
							questions={form_questions}
							formId={form_id}
							questionsLoading={questionsLoading}
							userId={userId}
							rating={rating}
							comment={comment}
							newFeedbackId={newFeedbackId}
							setNewFeedbackId={setNewFeedbackId}
							setComment={setComment}
							showForm={addFeedback}
							setShowForm={setAddFeedback}
							setRating={setRating}
						/>
					</Modal.Body>
				</Modal>
			)}

		</div>
	);
}

export default FeedbackFormModal;
