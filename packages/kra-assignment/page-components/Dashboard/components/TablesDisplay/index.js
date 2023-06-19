// import React, { useState } from 'react';

import StyledTable from '../../../common/StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';

function TableDisplay({ data = {}, loading, ARRAY_OF_IDS = [], selectArray = [], setSelectArray }) {
	// console.log(':::::', data);

	const removeItem = (valueToRemove) => {
		const updatedItems = selectArray.filter((item) => item !== valueToRemove);
		setSelectArray(updatedItems);
	};

	const columns = getColumns({ selectArray, setSelectArray, ARRAY_OF_IDS, removeItem });

	return (
		<div className={styles.container}>
			<StyledTable
				columns={columns}
				data={data}
				emptyText={TABLE_EMPTY_TEXT}
				loading={loading}
			/>
		</div>
	);
}

export default TableDisplay;
