import React from 'react';

import StyledTable from '../../commons/StyledTable/index.tsx';

import EntityConfig from './Configuration/EntityConfig';
import CustomTable from './CustomTable';
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

	const onPageChange = (val) => {
		setEntityFilters({ ...entityFilters, pageIndex: val });
	};

	return (
		<>
			<Header filters={entityFilters} setFilters={setEntityFilters} />
			<SelectFilters
				filters={entityFilters}
				setFilters={setEntityFilters}
			/>

			{entityFilters?.activeEntity === 'reports'
				? (
					<CustomTable
						data={reportsListData}
						onPageChange={onPageChange}
						loading={reportsListLoading}
						filters={entityFilters}
						setFilters={setEntityFilters}
					/>
				) : (
					<StyledTable
						data={list}
						columns={EntityConfig({ refetch })}
						loading={entityListLoading}
						imageFind="FinanceDashboard"
					/>
				)}
		</>
	);
}

export default Treasury;
