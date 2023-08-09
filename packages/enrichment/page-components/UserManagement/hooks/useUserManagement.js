import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import getUserManagementColumns from '../utils/get-user-management-columns';

const useUserManagement = () => {
	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [selectedRowId, setSelectedRowId] = useState('');
	const [statusToggle, setStatusToggle] = useState('active');
	const [searchValue, setSearchValue] = useState('');
	const [actionModal, setActionModal] = useState({});

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		filters    : {
			q      : searchQuery || undefined,
			status : statusToggle,

		},
		permissions_data_required    : false,
		rm_mappings_data_required    : false,
		expertise_data_required      : false,
		add_service_objects_required : false,

	});

	const [{ loading, data }, refetch] = useAllocationRequest(
		{
			url    : '/list_partner_users',
			method : 'get',

			params,
		},
		{ manual: false },
	);

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				q      : searchQuery || undefined,
				status : statusToggle,
			},
		}));
	}, [statusToggle, searchQuery]);

	const columns = getUserManagementColumns({ selectedRowId, setSelectedRowId, setActionModal });

	return {
		refetch,
		columns,
		list,
		paginationData,
		loading,
		setParams,
		getNextPage,
		debounceQuery,
		searchValue,
		setSearchValue,
		actionModal,
		setActionModal,
		statusToggle,
		setStatusToggle,

	};
};

export default useUserManagement;
