import { columns } from '../Configuration/columns';
import { requestColumn } from '../Configuration/RequestColumn';

import { ColumnInterface } from './interface';

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
