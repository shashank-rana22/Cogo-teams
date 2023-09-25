import { columns } from '../Configuration/columns';
import { requestColumn } from '../Configuration/RequestColumn';

import { ColumnInterface } from './interface';

const getColumns = ({
	activeTab, setIsAscendingActive, setFilters,
	isAscendingActive, getIncidentData, t = () => {}, detailsModal = {},
	setDetailsModal,
}:ColumnInterface) => {
	if (activeTab === 'requested') {
		return requestColumn({
			setIsAscendingActive,
			setFilters,
			isAscendingActive,
			getIncidentData,
			t,
			detailsModal,
			setDetailsModal,
		});
	}
	return (
		columns({
			setIsAscendingActive,
			setFilters,
			isAscendingActive,
			getIncidentData,
			activeTab,
			t,
			detailsModal,
			setDetailsModal,
		})
	);
};

export default getColumns;
