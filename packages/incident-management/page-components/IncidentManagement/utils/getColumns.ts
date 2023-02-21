import approvedColumn from '../configs/approved-table';
import rejectedColumn from '../configs/rejected-table';
import requestedColumn from '../configs/requested-table';

// interface ItemProps {
// 	activeTab: string,
// 	setActiveTab:Function,
// 	isSortActive:string,
// 	setIsSortActive:Function,
// 	setGlobalFilters:Function,
// 	refetch:Function,
// 	setPayload:Function,
// }

// const getColumns = (
// 	activeTab: string,
// 	setActiveTab:Function,
// 	isSortActive:string,
// 	setIsSortActive:Function,
// 	setGlobalFilters:Function,
// 	refetch:Function,
// 	setPayload:Function,
// ) => {
// 	if (activeTab === 'requested') {
// 		return requestedColumn({ isSortActive, setIsSortActive, setGlobalFilters, refetch });
// 	}
// 	if (activeTab === 'approved') {
// 		return approvedColumn({ isSortActive, setIsSortActive, setGlobalFilters, refetch });
// 	}
// 	if (activeTab === 'rejected') {
// 		return rejectedColumn({ isSortActive, setIsSortActive, setGlobalFilters, refetch, setActiveTab, setPayload });
// 	}
// 	return null;
// };

// export default getColumns;

export const COLUMNS_MAPPING = ({
	setActiveTab,
	isSortActive,
	setIsSortActive,
	setGlobalFilters,
	refetch,
	setPayload,
}) => ({
	requested : requestedColumn({ isSortActive, setIsSortActive, setGlobalFilters, refetch }),
	approved  : approvedColumn({ isSortActive, setIsSortActive, setGlobalFilters, refetch }),
	rejected  : rejectedColumn({ isSortActive, setIsSortActive, setGlobalFilters, refetch, setActiveTab, setPayload }),
});
