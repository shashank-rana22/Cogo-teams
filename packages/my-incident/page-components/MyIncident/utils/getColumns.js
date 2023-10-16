import approvedColumn from '../configs/approved-table';
import rejectedColumn from '../configs/rejected-table';
import requestedColumn from '../configs/requested-table';

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
