import { Button, Pagination } from '@cogoport/components';
import { IcMFeedback, IcMArrowLeft } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import useGetFeedbacks from './hooks/useGetFeedbacks';
import styles from './styles.module.css';

const DEFAULT_PAGE = 1;

function Feedback({ setShowFeedback = () => {} }) {
	const [showAddFeedback, setShowAddFeedback] = useState(false);
	const [page, setPage] = useState(DEFAULT_PAGE);
	const [activeTab, setActiveTab] = useState('all');

	const { feedbacks, loading, getFeedbacks, pageData } = useGetFeedbacks({ activeTab, page });
	const { total = '' } = pageData || {};

	return (
		<div className={styles.feedback_section}>

			{showAddFeedback
				? (
					<FeedbackForm getFeedbacks={getFeedbacks} setShowAddFeedback={setShowAddFeedback} />
				)
				: (
					<div className={styles.header}>
						<div className={styles.back_action}>
							<Button
								size="sm"
								themeType="link"
								className={styles.feedback}
								onClick={() => setShowFeedback((prev) => !prev)}
							>
								<IcMArrowLeft />
							</Button>

							<div className={styles.title}>
								<IcMFeedback />
								Feedbacks

							</div>
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

			{!showAddFeedback && (
				<FeedbackList
					setActiveTab={setActiveTab}
					activeTab={activeTab}
					feedbacks={feedbacks}
					loading={loading}
				/>
			)}

			{!isEmpty(feedbacks) && !showAddFeedback && (
				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total}
						pageSize={10}
						onPageChange={(val) => setPage(val)}
					/>
				</div>
			)}
		</div>
	);
}

export default Feedback;
