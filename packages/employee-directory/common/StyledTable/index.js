import { Table, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function StyledTable({
	columns = [], data = [], loading = false, emptyText = '', onRowClick = () => {},
	className = '',
}) {
	if (isEmpty(data) && !loading) {
		return (
			<div style={{ paddingTop: 6, paddingLeft: 6 }}>
				<EmptyState emptyText={emptyText} />
			</div>
		);
	}

	return (
		<section className={cl`${styles.container} ${styles[className]}`}>
			<Table columns={columns} data={data} loading={loading} onRowClick={onRowClick} />
		</section>
	);
}

export default StyledTable;
