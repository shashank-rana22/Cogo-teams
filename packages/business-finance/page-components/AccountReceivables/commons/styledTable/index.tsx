import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../commons/EmptyStateDocs';
import { TableProps } from '../Interfaces/index';

import styles from './styles.module.css';

function StyledTable({ id, className, columns, data, loading, ...rest }:TableProps) {
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
			{!data?.length && !loading && <EmptyState />}
		</div>
	);
}

export default StyledTable;
