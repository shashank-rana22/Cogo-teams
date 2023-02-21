import React from 'react';

import StyledTable from '../../../../commons/StyledTable';

import Header from './Header';
import styles from './styles.module.css';

function AddedQuestions({ data, columns, searchInput, setSearchInput, activeList, setActiveList }) {
	return (
		<div className={styles.container}>
			<Header
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				activeList={activeList}
				setActiveList={setActiveList}
			/>

			<div className={styles.table}>
				<StyledTable columns={columns} data={data} />
			</div>
		</div>
	);
}

export default AddedQuestions;
