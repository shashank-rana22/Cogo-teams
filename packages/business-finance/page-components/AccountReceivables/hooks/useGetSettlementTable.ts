import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetSettlementTable(organizationId:string, entityCode?: number) {
	const [settlementFilters, setSettlementFilters] = useState({
		page        : 1,
		pageLimit   : 10,
		orgId       : organizationId,
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
							entityCode  : entityCode || undefined,
						},
					});
				} catch (e) {
					Toast.error(e?.message);
				}
			};
			refetch();
		},
		[accountType, orgId, page, pageLimit, query, trigger, entityCode],
	);

	return {
		settlementList,
		loading,
		settlementFilters,
		setSettlementFilters,
	};
}

export default useGetSettlementTable;
