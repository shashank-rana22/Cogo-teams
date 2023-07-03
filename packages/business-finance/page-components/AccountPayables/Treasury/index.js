import { Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import StyledTable from '../../commons/StyledTable';

import EntityConfig from './Configuration/EntityConfig';
import Header from './Header';
import useGetEntityList from './hooks/useGetEntityList';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';

function Treasury() {
	const {
		entityListData,
		reportsListData,
		entityListLoading,
		reportsListLoading,
		refetch,
		entityFilters,
		setEntityFilters,
	} = useGetEntityList();

	const { list = [], pageNo = 1, totalRecords = 0 } = entityListData || {};

	console.log('entityListData', entityListData);

	console.log('reportsListData', reportsListData);

	// const onPageChange = (val) => {
	// 	setEntityFilters({ ...entityFilters, page: val });
	// };

	return (
		<>
			<div className={styles.hr} />
			<Header filters={entityFilters} setFilters={setEntityFilters} />
			<SelectFilters
				filters={entityFilters}
				setFilters={setEntityFilters}
			/>
			<StyledTable
				data={list}
				columns={EntityConfig({ refetch })}
				loading={entityListLoading}
				imageFind="FinanceDashboard"
			/>
			{/* <Pagination
				className={styles.pagination}
				type="number"
				currentPage={pageNo}
				totalItems={totalRecords}
				pageSize={10}
				onPageChange={onPageChange}
			/> */}
		</>
	);
}

export default Treasury;
