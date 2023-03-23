import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetSettlementTable(organizationId) {
	const [settlementFilters, setSettlementFilters] = useState({
		page        : 1,
		pageLimit   : 10,
		orgId       : 'b8099de7-8bae-4cf0-9db2-3a75171b11de',
		query       : '',
		accountType : 'All',
	});

	const [orderBy, setOrderBy] = useState({
		sortType : 'Desc',
		sortBy   : 'transactionDate',
	});

	const { query, ...rest } = settlementFilters || {};

	const { debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(query);
	}, [query]);

	console.log('orderBy', orderBy);

	const [
		{ data: settlementList, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/settlement/history',
			method  : 'get',
			authKey : 'get_payments_settlement_history',
		},
		{ manual: true },
	);

	const refetch = () => {
		try {
			trigger({
				params: {
					...rest,
					...orderBy,
					query: query || undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	};

	useEffect(
		() => {
			refetch();
		},
		[JSON.stringify(settlementFilters)],
	);

	return {
		settlementList,
		loading,
		refetch,
		settlementFilters,
		setSettlementFilters,
		orderBy,
		setOrderBy,
	};
}

export default useGetSettlementTable;
