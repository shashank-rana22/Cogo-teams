import { Button, RatingComponent } from '@cogoport/components';
import { IcCStar } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useUpdateTicketFeedback from '../../../../hooks/useUpdateTicketFeedback';

import styles from './styles.module.css';

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
			{isEmpty(ticketRating) ? (
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
							disabled={updateLoading || isEmpty(ticketRating)}
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
