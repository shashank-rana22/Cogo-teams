import { useState } from 'react';

import EmptyState from '../common/EmptyState';
import Filters from '../common/Filters';
import { IncidentDataInterface } from '../interface';
import StyledTable from '../StyledTable';
import getColumns from '../utils/getColumns';

function TabComponent({
	activeTab,
	incidentData,
	setFilters,
	filters,
	isSettlementExecutive,
	incidentLoading,
	getIncidentData,
}:IncidentDataInterface) {
	const [isAscendingActive, setIsAscendingActive] = useState();
	const { list = [], paginationData } = incidentData || {};
	const { total = 0, pageSize = 10 } = paginationData || {};
	const { page } = filters || {};
	const columns = getColumns({ activeTab, setIsAscendingActive, setFilters, isAscendingActive, getIncidentData });
	return (
		<div>
			<Filters
				onChangeFilters={setFilters}
				isSettlementExecutive={isSettlementExecutive}
				activeTab={activeTab}
				filters={filters}
			/>

			<StyledTable
				page={page}
				total={total}
				pageSize={pageSize}
				data={list}
				columns={columns}
				loading={incidentLoading}
				setFilters={setFilters}
				filters={filters}
			/>

			{list.length === 0 && <EmptyState />}
		</div>
	);
}
export default TabComponent;
