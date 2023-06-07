import { useRequest } from '@cogo/commons/hooks';
import useSearchQuery from '@cogo/project-partner/page-components/outstanding/helpers/debounce';
import { useEffect, useState } from 'react';

const useGetOrganizationList = ({ pagination }) => {
	const { query, debounceQuery } = useSearchQuery();
	const [searchQuery, setSearchQuery] = useState();
	const { loading, data, trigger } = useRequest(
		'get',
		true,
		'business_finance',
		{
			authkey: 'get_payments_defaulters_list',
		},
	)('/payments/defaulters/list');

	const onQueryChange = (value) => {
		debounceQuery(value);
		setSearchQuery(value);
	};

	const refetch = async () => {
		trigger({
			params: {
				q         : query,
				page      : pagination,
				pageLimit : 10,
			},
		});
	};

	useEffect(() => {
		refetch();
	}, [pagination, query]);

	return {
		bprLoading : loading,
		bprData    : data,
		onQueryChange,
		refetch,
		searchQuery,
	};
};

export default useGetOrganizationList;
