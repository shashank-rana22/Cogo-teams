import React from 'react';

import AddedQuestions from './AddedQuestions';
import styles from './styles.module.css';
import useQuestionList from './useQuestionList';

function QuestionsList() {
	const {
		data, columns, searchInput,
		setSearchInput, activeList, setActiveList,
	} = useQuestionList();

	return (
		<div className={styles.container}>
			<AddedQuestions
				data={data}
				columns={columns}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				activeList={activeList}
				setActiveList={setActiveList}
			/>
		</div>
	);
}

export default QuestionsList;
