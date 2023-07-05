import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

interface Props {
	filters?: {
		search?: string;
		pageIndex?: number;
	};
	setFilters?: Function;
}

function useGetCustomerList({ filters, setFilters }:Props) {
	const { search, pageIndex } = filters || {};
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/list-overall-outstanding-and-on-account-per-trade-party',
			method  : 'get',
			authKey : 'get_payments_dunning_list_overall_outstanding_and_on_account_per_trade_party',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
		setFilters((prev) => ({ ...prev, pageIndex: 1 }));
	}, [search, debounceQuery, setFilters]);

	const getCustomerList = useCallback(async () => {
		try {
			await trigger({
				params: {
					query: query || undefined,
					pageIndex,
				},
			});
		} catch (err) {
			console.log('err-', err);
		}
	}, [trigger, query, pageIndex]);

	useEffect(() => {
		getCustomerList();
	}, [getCustomerList, query, pageIndex]);

	return {
		data,
		loading,
	};
}

export default useGetCustomerList;
