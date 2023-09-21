import { Button } from '@cogoport/components';
import { IcMFeedback } from '@cogoport/icons-react';
import { useState } from 'react';

import FeedbackForm from './FeedbackForm';
import useGetFeedbacks from './hooks/useGetFeedbacks';
import List from './List';
import styles from './styles.module.css';

function Feedback() {
	const [showAddFeedback, setShowAddFeedback] = useState(false);
	const DEFAULT_PAGE = 1;
	const [page, setPage] = useState(DEFAULT_PAGE);

	const { feedbacks, pageData } = 	useGetFeedbacks({ page });

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
			<List
				feedbacks={feedbacks}
				setPage={setPage}
				page={page}
				{...pageData}
			/>
		</div>
	);
}

export default Feedback;
