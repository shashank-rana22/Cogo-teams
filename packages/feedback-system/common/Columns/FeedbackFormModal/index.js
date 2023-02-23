import { Button, Modal } from '@cogoport/components';
import { IcMEdit, IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetForm from '../../../utils/useGetForm';

import FeedBackForm from './FeedBackForm';
import styles from './styles.module.css';

// const getSaturday = (date) => {
// 	date.setDate(1);
// 	while (date.getDay() !== 6) {
// 		date.setDate(date.getDate() + 1);
// 	}
// 	return date;
// };

function FeedbackFormModal({
	action = '',
	item = {},
	getTeamFeedbackList = () => {},
	setRefetchReportees = () => {},
}) {
	const {
		user_id: userId = '', feedback = '',
		feedback_id = '',
	} = item;

	const [addFeedback, setAddFeedback] = useState(false);

	const {
		formData = {},
		loading: questionsLoading = false,
	} = useGetForm({
		item, action, addFeedback,
	});

	const { form_questions = [], form_id = '', form_responses = [] } = formData;

	const [rating, setRating] = useState({});
	const [comment, setComment] = useState(feedback);

	const questionsToShow = action === 'show' ? form_responses : form_questions;

	const onCloseFunction = () => {
		setAddFeedback(false);
		getTeamFeedbackList();
	};

	useEffect(() => {
		if (!isEmpty(form_responses)) {
			const oldResponses = {};

			(form_responses || []).forEach((res) => { oldResponses[res.id] = res.rating; });
			if (action === 'show') {
				setRating(oldResponses);
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form_responses]);

	// const currentDate = new Date();

	// const firstSaturday = getSaturday(currentDate);

	// const timeAfterTwoDays = addDays(firstSaturday, 2);

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
				{action === 'show' ? (
					<Button
						size="sm"
						themeType="link"
						onClick={() => 	setAddFeedback(true)}
					>
						View Form
					</Button>
				) : (
					<Button
						size="sm"
						themeType="accent"
						disabled={!isEmpty(feedback_id)}
						onClick={() => 	setAddFeedback(true)}
					>
						{isEmpty(feedback_id) ? (
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
				)}

			</div>

			{addFeedback && (
				<Modal
					show={addFeedback}
					onClose={() => onCloseFunction()}
					size="xl"
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
							action={action}
							userId={userId}
							form_id={form_id}
							questionsToShow={questionsToShow}
							questionsLoading={questionsLoading}
							rating={rating}
							comment={comment}
							setComment={setComment}
							showForm={addFeedback}
							setShowForm={setAddFeedback}
							setRating={setRating}
							setRefetchReportees={setRefetchReportees}
						/>
					</Modal.Body>
				</Modal>
			)}

		</div>
	);
}

export default FeedbackFormModal;
