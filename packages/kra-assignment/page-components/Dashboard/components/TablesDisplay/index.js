// import React, { useState } from 'react';

import StyledTable from '../../../common/StyledTable';

import getColumns from './getColumns';
import getColumnsAccordian from './getColumnsAccordian';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';
const TABLE_USED_FOR = 'AccordianData';

function TableDisplay({ data = {}, loading, ARRAY_OF_IDS = [], selectArray = [], setSelectArray, type = '' }) {
	// console.log(':::::', type);

	const removeItem = (valueToRemove) => {
		const updatedItems = selectArray.filter((item) => item !== valueToRemove);
		setSelectArray(updatedItems);
	};
	const columns = type === TABLE_USED_FOR
		? getColumnsAccordian({ selectArray, setSelectArray, ARRAY_OF_IDS, removeItem })
		: getColumns({ selectArray, setSelectArray, ARRAY_OF_IDS, removeItem });

	return (
		<div className={type === TABLE_USED_FOR ? styles.accordian : styles.container}>
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
