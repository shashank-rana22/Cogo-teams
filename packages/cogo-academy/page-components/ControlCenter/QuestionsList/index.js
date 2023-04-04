import React, { useEffect } from 'react';

import AddedQuestions from './AddedQuestions';
import styles from './styles.module.css';
import useQuestionList from './useQuestionList';

function QuestionsList() {
	const props = useQuestionList();

	const { activeList = '', setPage = () => {} } = props;

	useEffect(() => {
		setPage(1);
	}, [activeList, setPage]);

	return (
		<div className={styles.container}>
			<AddedQuestions
				{...props}
			/>
		</div>
	);
}

export default QuestionsList;
