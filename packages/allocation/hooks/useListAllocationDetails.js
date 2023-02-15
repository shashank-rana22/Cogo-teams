import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

const useListAllocationDetails = () => {
	const {
		general: { query = {}, locale = '' },
	} = useSelector((reduxState) => reduxState);

	const { partner_id = '', instance_id = '' } = query;

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState();

	const [params, setParams] = useState({
		page_limit                           : 50,
		page                                 : 1,
		is_allocation_instance_required      : true,
		is_allocation_configuration_required : true,
		filters                              : {
			allocation_instance_id: instance_id,
		},
	});

	const [{ loading, data }, refetch] = useRequest({
		url     : '/details',
		method  : 'get',
		authkey : 'get_allocation_details',
		params,
	}, { manual: false });

	useEffect(() => {
		setParams((prevParams) => ({
			...prevParams,
			filters: {
				...prevParams.filters,
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	const {
		allocation_configuration = {},
		allocation_instance = {},
		list = [],
		...paginationData
	} = data || {};

	const configurationDetails = {
		...allocation_configuration,
		...allocation_instance,
	};

	return {
		loading,
		list,
		paginationData,
		getNextPage,
		listRefetch: refetch,
		params,
		setParams,
		partner_id,
		locale,
		debounceQuery,
		searchQuery,
		searchValue,
		setSearchValue,
		configurationDetails,
	};
};

export default useListAllocationDetails;
