import React, { useState } from 'react';

import StyledTable from '../../commons/StyledTable';

import EntityConfig from './Configuration/EntityConfig';
import Header from './Header';
import useGetEntityList from './hooks/useGetEntityList';
import SelectFilters from './SelectFilters';

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

	const { list = [] } = entityListData || {};

	console.log('entityListData', entityListData);

	console.log('reportsListData', reportsListData);

	return (
		<>
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
		</>
	);
}

export default Treasury;
