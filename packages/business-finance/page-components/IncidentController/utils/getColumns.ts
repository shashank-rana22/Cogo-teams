import { ColumnInterface } from './interface';
import { requestColumn } from './requestColumn';

const getColumns = ({
	activeTab, setIsAscendingActive, setFilters,
	isAscendingActive, getIncidentData,
}:ColumnInterface) => {
	if (activeTab === 'requested') {
		return requestColumn({ setIsAscendingActive, setFilters, isAscendingActive, getIncidentData });
	}
	return (
		null
		// pendingColumns(refetch)
	);
};

export default getColumns;
