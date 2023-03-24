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

	const { query, accountType, pageLimit, page, orgId } = settlementFilters || {};

	const { debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(query);
	}, [debounceQuery, query]);

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

	useEffect(
		() => {
			const refetch = () => {
				try {
					trigger({
						params: {
							page,
							pageLimit,
							orgId       : orgId || undefined,
							accountType : accountType || undefined,
							query       : query || undefined,
						},
					});
				} catch (e) {
					Toast.error(e?.message);
				}
			};
			refetch();
		},
		[accountType, orgId, page, pageLimit, query, trigger],
	);

	return {
		settlementList,
		loading,
		settlementFilters,
		setSettlementFilters,
	};
}

export default useGetSettlementTable;
