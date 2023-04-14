import { Pagination, Table } from '@cogoport/components';
import React, { ReactNode } from 'react';

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
	renderRowSubComponent?:(itemData: object) => ReactNode
	showAllNestedOptions?:boolean
	showEmptyState?:string
}

function StyledTable({
	id, className, columns, selectType, showAllNestedOptions, showEmptyState,
	data, renderRowSubComponent, pageSize, page, total, setFilters, filters, loading, ...rest
}: TableProps) {
	return (
		<div className={styles.table}>

			<Table
				columns={columns}
				renderRowSubComponent={renderRowSubComponent}
				data={data}
				id={id}
				className={className}
				loading={loading}
				selectType={selectType}
				showAllNestedOptions={showAllNestedOptions}
				{...rest}
			/>

			{data?.length === 0 && !loading && <EmptyState showEmptyState={showEmptyState} />}
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
