import React from 'react';

import SearchInput from '../../../../commons/SearchInput';

import styles from './styles.module.css';

function AddedQuestions({ searchInput, setSearchInput }) {
	return (
		<div className={styles.container}>
			<SearchInput
				value={searchInput}
				onChange={setSearchInput}
				size="md"
				placeholder="Search a question"
			/>
		</div>
	);
}

export default AddedQuestions;
