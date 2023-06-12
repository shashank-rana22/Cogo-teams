import { Table } from '@cogoport/components';
import React from 'react';

import { TableListProps } from '../../../commons/Interfaces';
import Filters from '../Filters';

import EmptyState from './EmptyState';
import styles from './styles.module.css';

function StyledTable({
	id, className, columns, data, setExceptionFilter, exceptionFilter, subTabsValue, searchValue,
	showCycleExceptions,
	setShowCycleExceptions,
	setSearchValue, ...rest
}:TableListProps) {
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

export default StyledTable;
