import { Pagination, Table } from '@cogoport/components';
import React from 'react';

import { FilterInterface } from '../../Accruals/interface';
import EmptyState from '../EmptyState';

import styles from './style.module.css';

interface TableProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	page?:number,
	pageSize?:number,
	total?:number
	setFilters?: React.Dispatch<React.SetStateAction<FilterInterface>>
	filters?:FilterInterface
	columns: object[];
	data: object[];
	loading?: boolean;
	layoutType?: 'table' | 'block' | 'flex' | 'absolute';
	selectType?: 'single' | 'multiple';
	onRowSelect?: (row: object) => void;
	onRowClick?: (row: object) => void;
	getRowId?: (row: object) => string;
}

function StyledTable({
	id, className, columns, data, pageSize, page, total, setFilters, filters, loading, ...rest
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

			{data?.length === 0 && <EmptyState />}

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total}
					pageSize={pageSize}
					onPageChange={(val:number) => setFilters({ ...filters, page: val })}
				/>
			</div>
		</div>
	);
}
export default StyledTable;
