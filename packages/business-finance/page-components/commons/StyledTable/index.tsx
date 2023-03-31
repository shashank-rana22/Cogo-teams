import { Table } from '@cogoport/components';
import React from 'react';

import { TableProps } from '../Interfaces/index';

import EmptyState from './EmptyState';
import styles from './styles.module.css';

function StyledTable({ id, imageFind, className, columns, data, ...rest }:TableProps) {
	const { loading } = rest || {};

	return (
		<div className={`${styles.table} table_class`}>
			<Table
				columns={columns}
				data={data || [{}]}
				id={id}
				className={className}
				{...rest}
			/>
			{!loading && (
				data?.length === 0 && <EmptyState imageFind={imageFind} />
			)}

		</div>
	);
}

export default StyledTable;
