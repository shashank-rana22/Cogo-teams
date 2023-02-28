import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import AnswerPage from '../AnswerPage';
import QuestionsCollapse from '../QuestionCollapse';

import styles from './styles.module.css';

function Questions({ questions = {}, topicId = '', topicName = '' }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	// const toggle = () => (<AnswerPage questions={questions} />); /// todo
	const toggle = () => {
		const href = `/learning/faq/answer?id=${questions?.id}&topicId=${topicId}`;
		router.push(href, href);
	};

	return (
		<div className={styles.contentshow}>
			<div role="presentation" onClick={toggle} className={styles.cursor}>
				<QuestionsCollapse collapse={open} questions={questions} />
			</div>

		</div>
	);
}

export default Questions;
