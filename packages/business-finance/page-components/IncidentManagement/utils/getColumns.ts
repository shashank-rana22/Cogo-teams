import { columns } from './columns';
import { ColumnInterface } from './interface';
import { requestColumn } from './RequestColumn';

const getColumns = ({
	activeTab, setIsAscendingActive, setFilters,
	isAscendingActive, getIncidentData,
}:ColumnInterface) => {
	if (activeTab === 'requested') {
		return requestColumn({ setIsAscendingActive, setFilters, isAscendingActive, getIncidentData });
	}
	return (

		columns({ setIsAscendingActive, setFilters, isAscendingActive, getIncidentData, activeTab })
	);
};

export default getColumns;
