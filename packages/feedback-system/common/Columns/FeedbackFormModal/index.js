import { Button, Modal } from '@cogoport/components';
import { IcMEdit, IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty, addDays, startCase } from '@cogoport/utils';
import { useState } from 'react';

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
	action = '',
	item = {},
	getTeamFeedbackList = () => {},
}) {
	const {
		user_id:userId = '',
		performance_item: performanceItem = {}, feedback = '',
		feedback_data = {},
	} = item;

	const [addFeedback, setAddFeedback] = useState(false);
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
				{action === 'show' ? (
					<Button
						size="sm"
						themeType="link"
						onClick={() => 	setAddFeedback(true)}
					>
						View Details
					</Button>
				) : (
					<Button
						size="sm"
						themeType="accent"
						disabled={!isEmpty(feedback_data)}
						onClick={() => 	setAddFeedback(true)}
					>
						{isEmpty(feedback_data) ? (
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
							action={action}
							item={item}
							userId={userId}
							rating={rating}
							comment={comment}
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
