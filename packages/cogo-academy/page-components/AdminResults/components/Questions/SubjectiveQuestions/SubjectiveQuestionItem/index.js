import React from 'react';

import styles from './styles.module.css';

function SubjectiveQuestionItem({ question = '', answer = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.question_text}>{`Q ${question}`}</div>

			<div className={styles.answer_text}>
				<strong>Answer:</strong>

				<div dangerouslySetInnerHTML={{ __html: answer }} />
			</div>
		</div>
	);
}

export default SubjectiveQuestionItem;
