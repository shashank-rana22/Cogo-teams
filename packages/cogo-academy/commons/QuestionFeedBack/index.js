import { Pill } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import FeedBackContent from './FeedbackContent';
import styles from './styles.module.css';
import useListfaqFeedback from './useListFaqFeedback';

function QuestionFeedBack({ id }) {
	const { list } = useListfaqFeedback({ id });

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
		all                      : (list || []).length,
		questions                : feedbackOnquestion,
		answer                   : feedbackOnAnswer,
		both_question_and_answer : feedbackonBoth,
	};

	return (!isEmpty(list) && (
		<div className={styles.container}>
			<div className={styles.header}>Feedbacks on this question</div>
			<div className={styles.pills_container}>
				{Object.keys(mapping).map((ele) => (
					<Pill className={styles.pill}>
						{startCase(ele)}
						{' '}
						<span className={styles.pill_count}>{mapping[ele]}</span>
					</Pill>
				))}
			</div>

			{(list || []).map((element) => (
				<div>
					<FeedBackContent feedback={element} />
				</div>
			))}

		</div>
	)
	);
}

export default QuestionFeedBack;
