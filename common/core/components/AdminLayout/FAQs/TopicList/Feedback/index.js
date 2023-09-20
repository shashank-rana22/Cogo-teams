import { Button } from '@cogoport/components';
import { IcMFeedback } from '@cogoport/icons-react';
import { useState } from 'react';

import FeedbackForm from './FeedbackForm';
import styles from './styles.module.css';

function Feedback() {
	const [showAddFeedback, setShowAddFeedback] = useState(false);

	return (
		<div className={styles.feedback_section}>

			{showAddFeedback
				? (
					<FeedbackForm setShowAddFeedback={setShowAddFeedback} />
				)
				: (
					<div className={styles.header}>
						<div className={styles.title}>
							<IcMFeedback />
							Feedbacks

						</div>
						<div className={styles.feedback_action}>
							<Button
								size="sm"
								themeType="secondary"
								onClick={() => setShowAddFeedback(true)}
							>
								Add Feedback

							</Button>
						</div>
					</div>
				)}
		</div>
	);
}

export default Feedback;
