import React from 'react';

import StyledTable from '../../../common/StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';

function TableDisplay({ data, loading }) {
	const columns = getColumns();

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
