import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

interface Outstanding {
	page?:number,
	pageLimit?:number,
	search?:string,
}

const useGetOrgOutstanding = ({ formFilters }) => {
	const [outStandingFilters, setoutStandingFilters] = useState<Outstanding>({
		page      : 1,
		pageLimit : 10,
	});

	const [queryKey, setQueryKey] = useState('q');
	const [orderBy, setOrderBy] = useState({
		key   : 'totalOutstandingLedgerAmount',
		order : 'Desc',
		label : 'Total Outstanding Amount',
	});
	const { search, ...rest } = outStandingFilters || {};

	const { ageingKey, checkBox, salesAgentId, creditControllerId, companyType, entityCode } = formFilters;

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/outstanding/by-customer',
			method  : 'get',
			authKey : 'get_payments_outstanding_by_customer',
		},
		{ manual: true },
	);

	const { query, debounceQuery } = useDebounceQuery();
	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const refetch = useCallback((p?:any) => {
		const { order } = orderBy || {};
		try {
			trigger({
				params: {
					...rest,
					...formFilters || undefined,
					sortBy             : 'totalOutstandingLedgerAmount',
					sortType           : order,
					page               : p || rest?.page,
					ageingKey          : ageingKey || undefined,
					checkBox           : checkBox || undefined,
					salesAgentId       : salesAgentId || undefined,
					creditControllerId : creditControllerId || undefined,
					companyType        : companyType || undefined,
					// entityCode         : entityCode || undefined,
					entityCode         : '301',

				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const stringifiedRest = JSON.stringify(rest);
	const stringifiedOrderBy = JSON.stringify(orderBy);
	const stringifiedFormFilters = JSON.stringify(formFilters);

	useEffect(() => {
		refetch();
	}, [
		stringifiedRest,
		refetch,
		stringifiedOrderBy,
		stringifiedFormFilters,
	]);

	useEffect(() => {
		const resetQuery = {
			sageId               : undefined,
			q                    : undefined,
			organizationSerialId : undefined,
			tradePartySerialId   : undefined,
		};
		if (query) {
			setoutStandingFilters((p) => ({
				...p,
				...resetQuery,
				[queryKey] : query?.toUpperCase() || undefined,
				page       : 1,
			}));
		} else {
			setoutStandingFilters((p) => ({
				...p,
				...resetQuery,
				page: 1,
			}));
		}
	}, [query, queryKey]);

	return {
		outstandingLoading : loading,
		outStandingData    : data,
		setoutStandingFilters,
		outStandingFilters,
		orderBy,
		setOrderBy,
		setQueryKey,
		queryKey,
	};
};

export default useGetOrgOutstanding;
