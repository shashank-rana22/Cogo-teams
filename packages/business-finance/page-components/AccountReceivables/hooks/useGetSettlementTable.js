import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

function useGetSettlementTable(organizationId, entityCode) {
	const [filters, setFilters] = useState({
		query       : '',
		date        : { startDate: '', endDate: '' },
		accountType : 'All',
		orgId       : '',
		page        : 1,
		sortBy      : '',
		sortType    : '',
	});
	const [apiData, setApiData] = useState({});

	const { query: search = '', debounceQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/settlement/history',
			authKey : 'get_payments_settlement_history',
			method  : 'get',
		},
		{ manual: true },
	);

	const {
		query = '', date = { startDate: '', endDate: '' },
		accountType = 'All', page = 1, sortBy, sortType,
	} = filters;

	useEffect(() => {
		debounceQuery(query);
	}, [debounceQuery, query]);

	const refetch = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					accountType : accountType || 'All',
					orgId       : organizationId || undefined,
					startDate   : date?.startDate ? formatDate({
						date       : date?.startDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					}) : undefined,
					endDate: date?.endDate ? formatDate({
						date       : date?.endDate,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
						formatType : 'date',
					}) : undefined,
					query      : search || undefined,
					page,
					pageLimit  : 10,
					sortBy     : sortBy || undefined,
					sortType   : sortType || undefined,
					entityCode : entityCode || undefined,
				},
			});
			setApiData(res?.data || []);
		} catch (error) {
			setApiData({});
		}
	}, [accountType, date?.endDate, date?.startDate, entityCode,
		organizationId, page, search, sortBy, sortType, trigger]);

	useEffect(() => {
		if (!isEmpty(organizationId)) {
			refetch();
		}
	}, [organizationId, refetch]);

	return {
		filters,
		setFilters,
		data,
		loading,
		setApiData,
		apiData,
		refetch,
	};
}

export default useGetSettlementTable;
