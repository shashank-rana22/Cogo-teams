import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetSettlementTable(organizationId:string, entityCode?: string) {
	const [settlementFilters, setSettlementFilters] = useState({
		page        : 1,
		pageLimit   : 10,
		orgId       : organizationId,
		query       : '',
		accountType : 'All',
	});
	const [sort, setSort] = useState({
		sortType : 'Desc',
		sortBy   : 'settlementDate',
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
			url     : '/payments/settlement/list',
			method  : 'get',
			authKey : 'get_payments_settlement_list',
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
							sortBy      : sort?.sortBy || undefined,
							sortType    : sort?.sortType || undefined,
						},
					});
				} catch (e) {
					Toast.error(e?.message);
				}
			};
			refetch();
		},
		[accountType, orgId, page, pageLimit, query, trigger, entityCode, sort?.sortBy, sort?.sortType],
	);

	return {
		settlementList,
		loading,
		settlementFilters,
		setSettlementFilters,
		sort,
		setSort,
	};
}

export default useGetSettlementTable;
