import { columns } from '../Configuration/columns';
import { requestColumn } from '../Configuration/RequestColumn';

import { ColumnInterface } from './interface';

const getColumns = ({
	activeTab, setIsAscendingActive, setFilters,
	isAscendingActive, getIncidentData, t = () => {},
}:ColumnInterface) => {
	if (activeTab === 'requested') {
		return requestColumn({ setIsAscendingActive, setFilters, isAscendingActive, getIncidentData, t });
	}
	return (
		columns({ setIsAscendingActive, setFilters, isAscendingActive, getIncidentData, activeTab, t })
	);
};

export default getColumns;
