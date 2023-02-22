import React from 'react';

import Questions from '../Questions';

import styles from './styles.module.css';
// import useQuestionList from './useQuestionList';

function QuestionsList({ tabTitle }) {
	// const {
	// 	questionList, setQuestionList, searchInput,
	// 	setSearchInput,
	// } = useQuestionList();
	return (
		<div>
			<h1 className={styles.title}>
				{tabTitle}
			</h1>
			<div style={{ margin: '5px 0', width: '100%', height: '462px' }} className={styles.scrollable}>
				<div className={styles.border}><Questions /></div>
				<div className={styles.border}>
					<Questions />
				</div>
				<div className={styles.border}><Questions /></div>
				<div className={styles.border}>
					<Questions />
				</div>
				<div className={styles.border}><Questions /></div>
				<div className={styles.border}>
					<Questions />
				</div>

			</div>

		</div>
	);
}

export default QuestionsList;
