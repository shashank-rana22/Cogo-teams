import React from 'react';

import AllQuestions from './AllQuestions';
import styles from './styles.module.css';

function QuestionsList() {
	return (
		<div className={styles.container}>
			<AllQuestions />
		</div>
	);
}

export default QuestionsList;
