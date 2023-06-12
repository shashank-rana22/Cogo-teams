import { Table } from '@cogoport/components';
import React from 'react';

import Filters from '../Filters';

import EmptyState from './EmptyState';
import styles from './styles.module.css';

export interface TableProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	columns: object[];
	loading: boolean;
	data: object[];
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
	imageFind:string;
	setExceptionFilter?:React.Dispatch<React.SetStateAction<object>>;
	exceptionFilter?:object;
	subTabsValue?: string
}

function StyledTable({
	id, imageFind, className, columns, data, setExceptionFilter, exceptionFilter, subTabsValue, ...rest
}:TableProps) {
	const { loading } = rest || {};

	return (
		<div className={`${styles.table} table_class`}>
			<Filters
				exceptionFilter={exceptionFilter}
				setExceptionFilter={setExceptionFilter}
				subTabsValue={subTabsValue}
			/>
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
