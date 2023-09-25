import { columns } from '../Configuration/columnB';
import { requestColumn } from '../Configuration/RequestColumnB';

import { ColumnInterface } from './interface';

const getColumns = ({
	activeTab, setIsAscendingActive, setFilters,
	isAscendingActive, t = () => {},
	setDetailsModal,
}:ColumnInterface) => {
	if (activeTab === 'requested') {
		return requestColumn({
			setIsAscendingActive,
			setFilters,
			isAscendingActive,
			t,
			setDetailsModal,
		});
	}
	return (
		columns({
			setIsAscendingActive,
			setFilters,
			isAscendingActive,
			activeTab,
			t,
			setDetailsModal,
		})
	);
};

export default getColumns;
