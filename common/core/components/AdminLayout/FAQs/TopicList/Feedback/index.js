import { Button, Pagination } from '@cogoport/components';
import { IcMFeedback } from '@cogoport/icons-react';
import { useState } from 'react';

import FeedbackForm from './FeedbackForm';
import useGetFeedbacks from './hooks/useGetFeedbacks';
import List from './List';
import styles from './styles.module.css';

const DEFAULT_PAGE = 1;

function Feedback() {
	const [showAddFeedback, setShowAddFeedback] = useState(false);
	const [page, setPage] = useState(DEFAULT_PAGE);

	const { feedbacks, pageData } = useGetFeedbacks({ page });
	const { total = '' } = pageData || {};

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
								themeType="accent"
								onClick={() => setShowAddFeedback(true)}
							>
								Add Feedback

							</Button>
						</div>
					</div>
				)}

			<List
				feedbacks={feedbacks}
			/>

			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total}
					pageSize={10}
					onPageChange={(val) => setPage(val)}
				/>
			</div>
		</div>
	);
}

export default Feedback;
