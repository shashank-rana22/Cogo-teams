import { Table } from '@cogoport/components';
import React from 'react';

import { TableProps } from './interface';
import styles from './styles.module.css';

function StyledTable({
	id, className, columns, data, loading, ...rest
}: TableProps) {
	return (
		<div className={styles.table}>
			<Table
				columns={columns}
				data={data}
				id={id}
				className={className}
				loading={loading}
				{...rest}
			/>
		</div>
	);
}
export default StyledTable;
