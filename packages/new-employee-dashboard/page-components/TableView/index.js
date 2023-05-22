import React from 'react';

import StyledTable from '../StyledTable';

import styles from './styles.module.css';
import useTableView from './useTableView';

function TableView({ search }) {
	const { columns, loading, list } = useTableView({ search });

	return (
		<div className={styles.container}>
			<StyledTable
				columns={columns}
				data={list}
				loading={loading}
			/>
		</div>
	);
}

export default TableView;
