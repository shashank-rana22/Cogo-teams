import approvedColumn from '../configs/approved-table';
import rejectedColumn from '../configs/rejected-table';
import requestedColumn from '../configs/requested-table';

const getColumns = (
	activeTab: string,
	setActiveTab:Function,
	isSortActive:string,
	setIsSortActive:Function,
	setGlobalFilters:Function,
	refetch:Function,
	setPayload:Function,
	listData:Array<object>,
) => {
	if (activeTab === 'requested') {
		return requestedColumn({ isSortActive, setIsSortActive, setGlobalFilters, refetch });
	}
	if (activeTab === 'approved') {
		return approvedColumn({ isSortActive, setIsSortActive, setGlobalFilters, refetch });
	}
	if (activeTab === 'rejected') {
		return rejectedColumn({
			isSortActive,
			setIsSortActive,
			setGlobalFilters,
			refetch,
			setActiveTab,
			activeTab,
			setPayload,
			listData,
		});
	}
	return null;
};

export default getColumns;
