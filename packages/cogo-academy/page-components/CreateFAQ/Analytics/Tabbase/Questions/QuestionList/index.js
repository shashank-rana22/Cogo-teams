import React from 'react';

import AllQuestions from './AllQuestions';
import styles from './styles.module.css';

function QuestionsList(props) {
	return (
		<div className={styles.container}>
			<AllQuestions {...props} />
		</div>
	);
}

export default QuestionsList;
