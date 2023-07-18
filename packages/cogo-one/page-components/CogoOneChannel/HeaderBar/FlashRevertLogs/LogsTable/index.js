import { Table } from '@cogoport/components';
import React from 'react';

import dummyData from './dummyData';
import logsColumns from './logsColumns';
import styles from './styles.module.css';

function LogsTable() {
	const columns = logsColumns();

	return (
		<div className={styles.container}>
			<Table
				columns={columns}
				data={dummyData}
				layoutType="table"
			/>
		</div>
	);
}

export default LogsTable;
