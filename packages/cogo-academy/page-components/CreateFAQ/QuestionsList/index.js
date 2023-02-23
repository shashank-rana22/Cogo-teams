import React from 'react';

import AddedQuestions from './AddedQuestions';
import styles from './styles.module.css';
import useQuestionList from './useQuestionList';

function QuestionsList() {
	const {
		data, columns, searchInput,
		setSearchInput, activeList, setActiveList, questionListLoading,
		page, setPage, paginationData,
	} = useQuestionList();

	return (
		<div className={styles.container}>
			<AddedQuestions
				page={page}
				setPage={setPage}
				paginationData={paginationData}
				data={data}
				columns={columns}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				activeList={activeList}
				setActiveList={setActiveList}
				questionListLoading={questionListLoading}
			/>
		</div>
	);
}

export default QuestionsList;
