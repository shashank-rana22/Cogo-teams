import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function StyledTable({ columns = [], data = [], loading = false, emptyText = 'no data found ' }) {
	if (isEmpty(data) && !loading) {
		<EmptyState emptyText={emptyText} />;
	}

	return (
		<section className={styles.container}>
			<Table columns={columns} data={data} loading={loading} />
		</section>
	);
}

export default StyledTable;
