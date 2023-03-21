import React from 'react';

import useListFaqQuestions from '../../../../../hooks/useListFaqQuestions';

import AllQuestions from './AllQuestions';
import styles from './styles.module.css';

function QuestionsList({ id }) {
	const props = useListFaqQuestions({ id });
	return (
		<div className={styles.container}>
			<AllQuestions props={props?.data?.list} />
		</div>
	);
}

export default QuestionsList;
