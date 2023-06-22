import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function StyledTable({ columns = [], data = [], loading = false, emptyText, onRowClick }) {
	if (isEmpty(data) && !loading) {
		return (
			<div style={{ paddingTop: 6, paddingLeft: 6 }}>
				<EmptyState emptyText={emptyText} />
			</div>
		);
	}

	return (
		<section className={styles.container}>
			<Table columns={columns} data={data} loading={loading} onRowClick={onRowClick} />
		</section>
	);
}

export default StyledTable;
