import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect } from 'react';

interface Props {
	filters?: {
		search?: string;
		pageIndex?: number;
		service?: string[];
		entity?: string[];
	};
	setFilters?: Function;
}

function useGetCustomerList({ filters, setFilters }:Props) {
	const { search, pageIndex, service, entity } = filters || {};

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

	const getCustomerList = useCallback(() => {
		try {
			trigger({
				params: {
					serviceTypes : !isEmpty(service) ? service : undefined,
					entityCodes  : !isEmpty(entity) ? entity : undefined,
					query        : query || undefined,
					pageIndex,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [trigger, query, pageIndex, entity, service]);

	useEffect(() => {
		debounceQuery(search);
		setFilters((prev) => ({ ...prev, pageIndex: 1 }));
	}, [search, debounceQuery, setFilters]);

	useEffect(() => {
		getCustomerList();
	}, [getCustomerList, query, pageIndex]);

	return {
		data,
		loading,
	};
}

export default useGetCustomerList;
