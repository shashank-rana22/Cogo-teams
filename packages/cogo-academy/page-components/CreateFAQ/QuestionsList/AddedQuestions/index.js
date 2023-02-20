import React from 'react';

import Header from './Header';
import styles from './styles.module.css';

function AddedQuestions({ searchInput, setSearchInput }) {
	return (
		<div className={styles.container}>
			<Header searchInput={searchInput} setSearchInput={setSearchInput} />

		</div>
	);
}

export default AddedQuestions;
