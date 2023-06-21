import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../commons/StyledTable/EmptyState';
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
	getMasterList,
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
				getMasterList={getMasterList}
			/>
			<Table
				columns={columns}
				data={data || [{}]}
				id={id}
				className={className}
				{...rest}
			/>
			{!loading && (
				isEmpty(data) && <EmptyState imageFind="FinanceDashboard" />
			)}

		</div>
	);
}

export default ExceptionList;
