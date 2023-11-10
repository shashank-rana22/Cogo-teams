import { useDebounceQuery, useForm } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetQuestList = ({ manual = true }) => {
	const [params, setParams] = useState({
		page                      : 1,
		page_limit                : 10,
		cogo_entity_data_required : true,
		role_data_required        : true,
		sort_by                   : 'created_at',
		sort_type                 : 'desc',
	});

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const { control } = useForm();

	const [{ loading, data }, refetch] = useAllocationRequest(
		{
			url     : '/quests',
			method  : 'GET',
			authkey : 'get_agent_scoring_quests',
			params,
		},
		{ manual },
	);

	const getNextPage = (nextPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: nextPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	return {
		loading,
		list,
		paginationData,
		params,
		setParams,
		getNextPage,
		refetch,
		debounceQuery,
		control,
	};
};

export default useGetQuestList;
