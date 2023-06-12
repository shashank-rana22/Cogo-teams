import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

interface GetOrgParams {
	page : number;
	pageLimit : number;
}

interface Pagination {
	pagination : GetOrgParams;
}

const useGetOrganizationList = ({ pagination } : Pagination) => {
	const { page = 1, pageLimit = 10 } = pagination || {};
	const { query, debounceQuery } = useDebounceQuery();

	const [searchQuery, setSearchQuery] = useState();

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/defaulters/list',
			method  : 'get',
			authKey : 'get_payments_defaulters_list',
		},
		{ manual: true },
	);

	const onQueryChange = (value) => {
		debounceQuery(value);
		setSearchQuery(value);
	};

	const refetch = useCallback(async () => {
		trigger({
			params: {
				q: query || undefined,
				page,
				pageLimit,
			},
		});
	}, [page, pageLimit, query, trigger]);

	useEffect(() => {
		refetch();
	}, [pagination, query, refetch]);

	return {
		bprLoading : loading,
		bprData    : data,
		onQueryChange,
		refetch,
		searchQuery,
	};
};

export default useGetOrganizationList;
