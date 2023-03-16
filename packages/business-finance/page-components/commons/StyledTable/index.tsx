import { Table } from '@cogoport/components';
import React from 'react';

import { TableProps } from '../Interfaces/index';

import EmptyState from './EmptyState';
import styles from './styles.module.css';

function StyledTable({ id, imageFind, className, columns, data, ...rest }:TableProps) {
	return (
		<div className={styles.table}>
			<Table
				columns={columns}
				data={data || [{}]}
				id={id}
				className={className}
				{...rest}
			/>

			{data?.length === 0 && <EmptyState imageFind={imageFind} />}
		</div>
	);
}

export default StyledTable;
