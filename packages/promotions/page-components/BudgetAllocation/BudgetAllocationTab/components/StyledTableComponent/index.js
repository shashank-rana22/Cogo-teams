import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function StyledTableComponent({
	loading = false,
	columns = [],
	formattedData = [],
}) {
	return (
		<div>
			{(!loading && isEmpty(formattedData)) ? (
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
