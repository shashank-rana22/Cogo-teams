import { Button, RatingComponent } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUpdateTicketFeedback from '../../../../hooks/useUpdateTicketFeedback';

import styles from './styles.module.css';

const MIN_LENGTH_CHECK = 0;

function RateTicket({
	id = '',
	ticketRating = 0,
	refetchTicket = () => {},
	status,
}) {
	const [rating, setRating] = useState(ticketRating);

	const { updateTicketFeedback = () => {}, updateLoading } = useUpdateTicketFeedback({ refetchTicket });

	if (status === 'rejected') {
		return (
			<div className={styles.feedback_text}>Your ticket has been rejected.</div>
		);
	}

	return (
		<div className={styles.container} key={ticketRating}>
			{ticketRating === MIN_LENGTH_CHECK ? (
				<>
					<div className={styles.rating_text}>
						Was your issue resolved?
					</div>
					<div className={styles.rating_container}>
						<RatingComponent
							type="star"
							totalStars={5}
							value={rating}
							onChange={setRating}
							disabled={updateLoading || ticketRating > MIN_LENGTH_CHECK}
						/>
					</div>
					<div className={styles.button_container}>
						<Button
							size="md"
							themeType="secondary"
							disabled={updateLoading}
							onClick={() => {
								updateTicketFeedback(rating, id);
							}}
						>
							Submit
						</Button>
					</div>
				</>
			) : (
				<div className={styles.feedback_text}>
					Your Rating for this ticket is
					{' '}
					{ticketRating}
					<IcCStar className={styles.ticket_star} />
				</div>
			)}
		</div>
	);
}

export default RateTicket;
