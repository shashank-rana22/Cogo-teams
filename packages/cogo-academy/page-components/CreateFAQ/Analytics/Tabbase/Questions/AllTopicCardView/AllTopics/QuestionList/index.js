import React from 'react';

import useListFaqQuestions from '../../../../../../../FAQs/hooks/useListFaqQuestion';

import AllQuestions from './AllQuestions';
import styles from './styles.module.css';

function QuestionsList({ props }) {
	console.log(props, 'topicansw');
	return (
		<div className={styles.container}>
			<AllQuestions props={props} />
		</div>
	);
}

export default QuestionsList;
