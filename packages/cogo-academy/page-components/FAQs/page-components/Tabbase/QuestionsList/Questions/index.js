import { useRouter } from '@cogoport/next';
import React from 'react';

import QuestionsCollapse from './QuestionCollapse';
import styles from './styles.module.css';

function Questions({ questions = {}, topicId = '' }) {
	const router = useRouter();

	const toggle = () => {
		const showTopicId = topicId ? `&topicId=${topicId}` : '';
		const href = `/learning/faq/answer?id=${questions?.id}${showTopicId}`;
		router.push(href, href);
	};

	return (
		<div className={styles.contentshow}>
			<div role="presentation" onClick={toggle} className={styles.cursor}>
				<QuestionsCollapse questions={questions} />
			</div>

		</div>
	);
}

export default Questions;
