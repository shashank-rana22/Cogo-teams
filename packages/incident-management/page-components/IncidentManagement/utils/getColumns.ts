import approvedColumn from '../configs/approved-table';
import rejectedColumn from '../configs/rejected-table';
import requestedColumn from '../configs/requested-table';

const getColumns = (
	activeTab: string,
	isSortActive:string,
	setIsSortActive:Function,
	setGlobalFilters:Function,
	reftech:Function,
) => {
	if (activeTab === 'requested') {
		return requestedColumn({ isSortActive, setIsSortActive, setGlobalFilters, reftech });
	}
	if (activeTab === 'approved') {
		return approvedColumn({ isSortActive, setIsSortActive, setGlobalFilters, reftech });
	}
	if (activeTab === 'rejected') {
		return rejectedColumn({ isSortActive, setIsSortActive, setGlobalFilters, reftech });
	}
	return null;
};

export default getColumns;
