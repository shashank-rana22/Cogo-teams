import { useAllocationRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useGetQuests = () => {
	const [params, setParams] = useState({
		page                      : 1,
		page_limit                : 10,
		sort_by                   : 'created_at',
		sort_type                 : 'desc',
		cogo_entity_data_required : true,
		role_data_required        : true,
	});

	const [{ loading, data }, refetch] = useAllocationRequest(
		{
			url     : '/quests',
			method  : 'GET',
			authkey : 'get_agent_scoring_quests',
			params,
		},
		{ manual: false },
	);

	const getNextPage = (nextPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: nextPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		list,
		paginationData,
		params,
		setParams,
		getNextPage,
		refetch,
	};
};

export default useGetQuests;
