import { Table } from '@cogoport/components';
import React from 'react';

import { TableProps } from '../../../common/interface';

import styles from './styles.module.css';

function StyledTableICJV({
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
export default StyledTableICJV;
