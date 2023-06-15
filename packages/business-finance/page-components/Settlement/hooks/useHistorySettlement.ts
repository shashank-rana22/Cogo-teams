import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useHistorySettlemet = () => {
	const [filters, setFilters] = useState({});
	const [apiData, setApiData] = useState({});

	const { query: search = '', debounceQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useRequestBf(
		{
			// url     : '/payments/settlement/history',
			url     : 'https://api.stage.cogoport.io/payments/settlement/history',
			authKey : 'get_payments_settlement_history',
			method  : 'get',
		},
		{ manual: true },
	);

	const { query, date, accountType, orgId = '', page = 1, sortBy, sortType } = filters;

	console.log('filters', filters);

	useEffect(() => {
		debounceQuery(query);
	}, [debounceQuery, query]);

	const refetch = async () => {
		console.log('good');
		try {
			const res = await trigger({
				params: {
					accountType :	accountType || 'All',
					orgId       : orgId || undefined,
					startDate:
						date?.startDate
							? formatDate({
								date       : date?.startDate,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
								formatType : 'date',
							}) : undefined,
					endDate:
						date?.endDate
							? formatDate({
								date       : date?.endDate,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
								formatType : 'date',
							}) : undefined,
					query     : search !== '' ? search : undefined,
					page,
					pageLimit : 10,
					sortBy    : sortBy || undefined,
					sortType  : sortType || undefined,
					// ...sort,
				},
			});
			setApiData(res.data);
		} catch (error) {
			setApiData({});
			console.log(error);

			// toast.error('Someting went wrong, we are working on it!');
		}
	};

	useEffect(() => {
		if (Object.keys(filters).length > 1) {
			refetch();
		}
	}, [orgId, accountType, date, search, page, sortBy, sortType]);

	return {
		filters,
		setFilters,
		data,
		refetch,
		loading,
		setApiData,
		apiData,
	};
};

export default useHistorySettlemet;
