import { Button, RatingComponent } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useUpdateTicketFeedback from '../../../../../hooks/useUpdateTicketFeedback';

import styles from './styles.module.css';

function RateTicket({
	ID = '',
	ticketData = {},
	refetchTicket = () => {},
	Status,
}) {
	const { TicketFeedback } = ticketData || {};
	const { Rating = 0 } = TicketFeedback || {};
	const [rating, setRating] = useState(Rating);

	const { updateTicketFeedback = () => {}, updateLoading } = useUpdateTicketFeedback({ refetchTicket });

	if (Status === 'rejected') {
		return (
			<div className={styles.feedback_text}>
				Rejected
			</div>
		);
	}

	return (
		<div className={styles.container} key={Rating}>
			{Rating === 0 ? (
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
							disabled={updateLoading || Rating > 0}
						/>
					</div>
					<div className={styles.button_container}>
						<Button
							size="md"
							themeType="secondary"
							disabled={updateLoading}
							onClick={() => {
								updateTicketFeedback(rating, ID);
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
					{Rating}
					<IcCStar className={styles.ticket_star} />
				</div>
			)}
		</div>
	);
}

export default RateTicket;
