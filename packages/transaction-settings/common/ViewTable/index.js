import { Table } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ViewTable({
	columns = [], data = [], loading = false, onRowClick = {},
	renderRowSubComponent = () => {},
}, showAllNestedOptions = false) {
	return (
		<div className={styles.table_container}>
			<Table
				columns={columns}
				data={data}
				layoutType="table"
				loading={loading}
				onRowClick={onRowClick}
				renderRowSubComponent={renderRowSubComponent}
				showAllNestedOptions={showAllNestedOptions}
			/>
		</div>
	);
}

export default ViewTable;
