import React from 'react';

import AllQuestions from './AllQuestions';
import styles from './styles.module.css';

function QuestionsList({ id }) {
	return (
		<div className={styles.container}>
			<AllQuestions id={id} />
		</div>
	);
}

export default QuestionsList;
