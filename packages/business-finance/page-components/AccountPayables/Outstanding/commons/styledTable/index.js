import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../EmptyStateDocs';

import styles from './styles.module.css';

function StyledTable({
	id = '',
	className = '',
	columns = [],
	data = [],
	loading = false,
	...rest
}) {
	return (
		<div className={styles.table}>
			{(!isEmpty(data) || loading) && (
				<Table
					columns={columns}
					data={data || [{}]}
					id={id}
					className={className}
					loading={loading}
					{...rest}
				/>
			)}
			{(!data?.length && !loading) ? <EmptyState /> : null}
		</div>
	);
}

export default StyledTable;
