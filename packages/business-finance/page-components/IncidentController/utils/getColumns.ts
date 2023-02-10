import { ColumnInterface } from './interface';
import { RequestColumn } from './requestColumn';

const getColumns = ({
	activeTab, setIsAscendingActive, setFilters,
	isAscendingActive, getIncidentData,
}:ColumnInterface) => {
	if (activeTab === 'requested') {
		return RequestColumn({ setIsAscendingActive, setFilters, isAscendingActive, getIncidentData });
	}
	return (
		null
		// pendingColumns(refetch)
	);
};

export default getColumns;
