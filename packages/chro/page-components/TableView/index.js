import React from 'react';

import StyledTable from '../StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

function TableView({ search }) {
	const columns = getColumns();

	return (
		<div className={styles.table_container}>
			<StyledTable columns={columns} data={[{}]} />
		</div>
	);
}

export default TableView;
