import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useAllocationRelations = () => {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

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
			status : 'active',
			q      : searchQuery || undefined,
		},
		data_required: true,
	});

	const [searchValue, setSearchValue] = useState(params.filters?.q);

	const [{ loading, data: apiData }, refetch] = useAllocationRequest({
		url     : '/relations',
		method  : 'get',
		authkey : 'get_allocation_relations',
		params,
	}, { manual: false });

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		setParams((prevParams) => ({
			...prevParams,
			filters: {
				...prevParams.filters,
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

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
		searchValue,
		setSearchValue,
		debounceQuery,
		searchQuery,
	};
};

export default useAllocationRelations;
