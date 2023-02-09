import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useAllocationRelations = () => {
	// const [page, setPage] = useState(1);
	// const [searchValue, setSearchValue] = useState('');

	const [confirmModalState, setConfirmModalState] = useState({
		type                  : '',
		relationData          : {},
		showConfirmationModal : false,
		showApproveAllButton  : false,
	});

	const [activeTab, setActiveTab] = useState('active');

	const [bulkMode, setBulkMode] = useState(false);
	const [checkedRowsId, setCheckedRowsId] = useState([]);
	const [showCreateRelationModal, setShowCreateRelationModal] = useState(false);

	const [params, setParams] = useState({
		sort_type  : 'desc',
		sort_by    : 'expiry_date',
		page_limit : 10,
		page       : 1,
		filters    : {
			status: 'active',
		},
		data_required: true,
	});

	const [{ loading, data: apiData }, refetch] = useRequest({
		url    : '/list_allocation_relations',
		method : 'get',
		params,
	}, { manual: false });

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	const { list = [], ...paginationData } = apiData || {};

	return {
		loading,
		list,
		paginationData,
		params,
		setParams,
		showCreateRelationModal,
		setShowCreateRelationModal,
		fetchList: refetch,
		bulkMode,
		setBulkMode,
		checkedRowsId,
		setCheckedRowsId,
		activeTab,
		setActiveTab,
		confirmModalState,
		setConfirmModalState,
		getNextPage,
	};
};

export default useAllocationRelations;
