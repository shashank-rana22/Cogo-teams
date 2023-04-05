import { Pagination, Pill } from '@cogoport/components';
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
	} = useListfaqFeedback({ id });

	let feedbackOnquestion = 0;
	let feedbackOnAnswer = 0;
	let feedbackonBoth = 0;

	(list || []).forEach((ele) => {
		const { remark = '' } = ele || {};

		if ((remark || '').includes('Question not satisfactory.')) {
			feedbackOnquestion += 1;
		}
		if ((remark || '').includes('Answer not satisfactory')) {
			feedbackOnAnswer += 1;
		}
		if ((remark || '').includes('Answer not satisfactory')
		|| (remark || '').includes('Question not satisfactory')) {
			feedbackonBoth += 1;
		}
	});

	const mapping = {
		all                      : total_count,
		questions                : feedbackOnquestion,
		answer                   : feedbackOnAnswer,
		both_question_and_answer : feedbackonBoth,
	};

	return (!isEmpty(list) && (
		<div className={styles.container} style={{ width: source === 'create' ? '100%' : '80%' }}>
			<div
				className={styles.header}
				style={{ marginTop: source === 'create' ? '0px' : '30px' }}
			>
				Feedbacks on this question

			</div>
			<div className={styles.pills_container}>
				{Object.keys(mapping).map((ele) => (
					<Pill className={styles.pill}>
						{startCase(ele)}
						{' '}
						<span className={styles.pill_count}>{mapping[ele]}</span>
					</Pill>
				))}
			</div>

			<div className={styles.scrollable_container}>
				{(list || []).map((element) => (
					<div>
						<FeedBackContent
							feedback={element}
							onClickEdit={onClickEdit}
							id={id}
							source={source}
						/>
					</div>
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
	)
	);
}

export default QuestionFeedBack;
