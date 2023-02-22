import React from 'react';

import Questions from '../Questions';

import styles from './styles.module.css';
// import useQuestionList from './useQuestionList';

function QuestionsList(Tab) {
	// const {
	// 	questionList, setQuestionList, searchInput,
	// 	setSearchInput,
	// } = useQuestionList();
	return (
		<div>
			<h1 className={styles.title}>
				{Tab.Tabtitle}
			</h1>
			<br />
			<div className={styles.border}><Questions /></div>
			<div className={styles.border}><Questions /></div>

		</div>
	);
}

export default QuestionsList;
