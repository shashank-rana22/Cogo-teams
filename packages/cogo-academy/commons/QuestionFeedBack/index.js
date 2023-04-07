import { Pill, Pagination } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import FeedBackContent from './FeedbackContent';
import styles from './styles.module.css';
import useListfaqFeedback from './useListFaqFeedback';

function QuestionFeedBack({ id, source = '', onClickEdit = () => {} }) {
	const {
		list,
		page,
		setPage,
		total_count,
		page_limit,
		answer_remark,
		question_answer_remark,
		question_remark,
	} = useListfaqFeedback({ id });

	const FEEDBACK_COUNT_MAPPING = {
		all                      : total_count,
		questions                : question_remark,
		answer                   : answer_remark,
		both_question_and_answer : question_answer_remark,
	};

	if (isEmpty(list)) {
		return null;
	}

	return (
		<div className={styles.container} style={{ width: source === 'create' ? '100%' : '80%' }}>
			<div
				className={styles.header}
				style={{ marginTop: source === 'create' ? '0px' : '30px' }}
			>
				Feedbacks on this question

			</div>
			<div className={styles.pills_container}>
				{Object.keys(FEEDBACK_COUNT_MAPPING).map((feedbacks) => (
					<Pill className={styles.pill} key={feedbacks}>
						{startCase(feedbacks || '')}
						{' '}
						<span className={styles.pill_count}>{FEEDBACK_COUNT_MAPPING[feedbacks]}</span>
					</Pill>
				))}
			</div>

			<div className={styles.scrollable_container}>
				{(list || []).map((element) => (
					<FeedBackContent
						feedback={element}
						onClickEdit={onClickEdit}
						id={id}
						source={source}
						key={id}

					/>
				))}

				{total_count > 5

				&& (
					<div className={styles.pagination_container}>
						<Pagination
							type="compact"
							className="md"
							totalItems={total_count || 0}
							currentPage={page || 1}
							pageSize={page_limit}
							onPageChange={setPage}
						/>
					</div>
				)}
			</div>

		</div>
	);
}

export default QuestionFeedBack;
