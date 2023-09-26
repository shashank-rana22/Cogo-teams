import { Table } from '@cogoport/components';
import React from 'react';

import EmptyState from '../EmptyState';

import styles from './styles.module.css';

const ZERO = 0;

function StyledTableComponent({
	loading = false,
	columns = [],
	formattedData = [],
}) {
	return (
		<div>
			{!loading && formattedData.length === ZERO ? (
				<EmptyState />
			) : (
				<div className={styles.table}>
					<Table loading={loading} columns={columns} data={formattedData} />
				</div>
			)}
		</div>
	);
}

export default StyledTableComponent;
