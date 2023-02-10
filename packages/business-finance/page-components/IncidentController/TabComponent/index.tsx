import { useState } from 'react';

import Filters from '../common/Filters';
import useGetIncidentData from '../common/hooks/useGetIncidentData';
import { IncidentDataInterface, Tab } from '../interface';
import StyledTable from '../StyledTable';
import getColumns from '../utils/getColumns';

function TabComponent({ activeTab }:Tab) {
	const [isAscendingActive, setIsAscendingActive] = useState();
	const {
		incidentData,
		setFilters,
		filters,
		isSettlementExecutive,
		incidentLoading,
		getIncidentData,
	}:IncidentDataInterface = useGetIncidentData({ activeTab });

	const { list = [] } = incidentData || {};
	const columns = getColumns({ activeTab, setIsAscendingActive, setFilters, isAscendingActive, getIncidentData });
	return (
		<div>
			<Filters
				onChangeFilters={setFilters}
				isSettlementExecutive={isSettlementExecutive}
				activeTab={activeTab}
				filters={filters}
			/>
			<StyledTable data={list} columns={columns} loading={incidentLoading} />
		</div>
	);
}
export default TabComponent;
