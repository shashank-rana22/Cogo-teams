import React from 'react';

import useListFaqQuestions from '../../../../../FAQs/hooks/useListFaqQuestion';

import AllQuestions from './AllQuestions';
import styles from './styles.module.css';

function QuestionsList() {
	const props = useListFaqQuestions({});
	return (
		<div className={styles.container}>
			<AllQuestions {...props} />
		</div>
	);
}

export default QuestionsList;
