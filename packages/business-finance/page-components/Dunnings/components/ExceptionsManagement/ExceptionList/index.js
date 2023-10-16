import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../commons/StyledTable/EmptyState';
import Filters from '../Filters';

import styles from './styles.module.css';

function ExceptionList({
	id = '',
	className = '',
	columns = [{}],
	data = [{}],
	setExceptionFilter = null,
	exceptionFilter = {},
	subTabsValue = '',
	searchValue = '',
	showCycleExceptions = true,
	setShowCycleExceptions = null,
	setSearchValue = null,
	cycleListId = '',
	getMasterList = null,
	entityId = '',
	...rest
}) {
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
				entityId={entityId}
			/>
			<Table
				columns={columns}
				data={data}
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
