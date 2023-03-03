import React from 'react';

import AddedQuestions from './AddedQuestions';
import styles from './styles.module.css';
import useQuestionList from './useQuestionList';

function QuestionsList() {
	const props = useQuestionList();

	return (
		<div className={styles.container}>
			<AddedQuestions
				{...props}
			/>
		</div>
	);
}

export default QuestionsList;
