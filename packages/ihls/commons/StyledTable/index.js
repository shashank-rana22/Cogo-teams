import { Table } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function StyledTable({ columns = [], data = [], loading = false }) {
	return (
		<div className={styles.container}>
			<Table columns={columns} data={data} loading={loading} />
		</div>
	);
}

export default StyledTable;
