import { Modal, Button, RatingComponent, Textarea } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useCreateCustomerFeedback from '../../../../hooks/useCreateCustomerFeedback';

import styles from './styles.module.css';

const DEFAULT_RATING = 0;

function FeedbackModal() {
	const {
		query: { type = '' },
	} = useRouter();

	const [showFeedback, setShowFeedback] = useState(type === 'openFeedbackModal');
	const [starRating, setStarRating] = useState(DEFAULT_RATING);
	const [feedbackMessage, setFeedbackMessage] = useState('');

	const {
		createCustomerFeedback = () => {},
		customerFeedbackLoading = false,
	} = useCreateCustomerFeedback({ setShowFeedback });

	const handleSubmit = () => {
		createCustomerFeedback({ starRating, feedbackMessage });
	};

	return (
		<Modal
			size="md"
			show={showFeedback}
			onClose={() => setShowFeedback(false)}
			placement="center"
		>
			<Modal.Header title="Quotation Feedback" />
			<Modal.Body className={styles.modal_body}>
				<div className={styles.rating}>
					<div className={styles.rating_text}>
						Customer Experience
					</div>
					<RatingComponent
						type="star"
						totalStars={5}
						value={starRating}
						onChange={setStarRating}
					/>
				</div>
				<div className={styles.feed_message}>
					<Textarea
						name="a5"
						size="lg"
						placeholder="Feedback Message"
						rows={6}
						value={feedbackMessage}
						onChange={setFeedbackMessage}
					/>
				</div>

			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="accent"
					disabled={customerFeedbackLoading}
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default FeedbackModal;
