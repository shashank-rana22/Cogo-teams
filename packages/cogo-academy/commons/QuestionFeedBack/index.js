import { Pill, Pagination } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import FeedBackContent from './FeedbackContent';
import styles from './styles.module.css';
import useGetFaqFeedback from './useGetFaqFeedback';
import useListfaqFeedback from './useListFaqFeedback';

function QuestionFeedBack({ id, source = '', onClickEdit = () => {}, fetchQuestion, faqAudiences }) {
	const general = useSelector((state) => state.general || {});
	const { feedbackId = '' } = general.query || {};

	const {
		list = [],
		page,
		setPage,
		total_count,
		page_limit,
		answer_remark,
		question_answer_remark,
		question_remark,
		fetchListFaqFeedback,
	} = useListfaqFeedback({ id, feedbackId });

	const { data = {} } = useGetFaqFeedback({ feedbackId, page });

	const feedbacksList = page === 1 && feedbackId ? [data] : [];

	(list || []).map((feedback) => {
		feedbacksList.push(feedback);

		return feedbacksList;
	});

	let feedbackOnquestion = 0;
	let feedbackOnAnswer = 0;
	let feedbackonBoth = 0;

	const { remark = '' } = data || {};

	if ((remark || '').includes('Question not satisfactory.')) {
		feedbackOnquestion += 1;
	}
	if ((remark || '').includes('Answer not satisfactory')) {
		feedbackOnAnswer += 1;
	}
	if ((remark || '').includes('Answer not satisfactory') && remark.includes('Question not satisfactory.')) {
		feedbackonBoth += 1;
	}

	const FEEDBACK_COUNT_MAPPING = {
		all                      : !isEmpty(data) ? total_count + 1 : total_count,
		questions                : question_remark + feedbackOnquestion,
		answer                   : answer_remark + feedbackOnAnswer,
		both_question_and_answer : question_answer_remark + feedbackonBoth,
	};

	if (isEmpty(feedbacksList)) {
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
				{(feedbacksList || []).map((element) => (
					<FeedBackContent
						feedback={element}
						onClickEdit={onClickEdit}
						source={source}
						key={id}
						fetchListFaqFeedback={fetchListFaqFeedback}
						fetchQuestion={fetchQuestion}
						faqAudiences={faqAudiences}

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
