import { Table } from '@cogoport/components';
import React from 'react';

import EmptyState from '../../../commons/EmptyState';
import Filters from '../Filters';
import { ExceptionListProps } from '../Interfaces';

import styles from './styles.module.css';

function ExceptionList({
	id,
	className,
	columns,
	data,
	setExceptionFilter,
	exceptionFilter,
	subTabsValue,
	searchValue,
	showCycleExceptions,
	setShowCycleExceptions,
	setSearchValue,
	cycleListId,
	...rest
}:ExceptionListProps) {
	const { loading } = rest || {};

	return (
		<div className={`${styles.table} table_class`}>
			<Filters
				exceptionFilter={exceptionFilter}
				setExceptionFilter={setExceptionFilter}
				subTabsValue={subTabsValue}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				showCycleExceptions={showCycleExceptions}
				setShowCycleExceptions={setShowCycleExceptions}
				cycleListId={cycleListId}
			/>
			<Table
				columns={columns}
				data={data || [{}]}
				id={id}
				className={className}
				{...rest}
			/>
			{!loading && (
				data?.length === 0 && <EmptyState />
			)}

		</div>
	);
}

export default ExceptionList;
