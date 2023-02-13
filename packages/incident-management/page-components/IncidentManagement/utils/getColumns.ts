import approvedColumn from '../configs/approved-table';
import rejectedColumn from '../configs/rejected-table';
import requestedColumn from '../configs/requested-table';

const getColumns = (activeTab: string, isSortActive:string, setIsSortActive:Function, setGlobalFilters:Function) => {
	if (activeTab === 'requested') {
		return requestedColumn({ isSortActive, setIsSortActive, setGlobalFilters });
	}
	if (activeTab === 'approved') {
		return approvedColumn({ isSortActive, setIsSortActive, setGlobalFilters });
	}
	if (activeTab === 'rejected') {
		return rejectedColumn({ isSortActive, setIsSortActive, setGlobalFilters });
	}
	return null;
};

export default getColumns;
