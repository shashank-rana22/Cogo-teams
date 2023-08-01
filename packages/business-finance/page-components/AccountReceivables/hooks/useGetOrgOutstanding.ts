import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

interface Outstanding {
	page?:number,
	pageLimit?:number,
	search?:string,
	organizationSerialId?:string
	q?:string
	sageId?:string
	tradePartySerialId?:string
}

interface GetOrgOutstanding {
	entityCode?: string
}

const useGetOrgOutstanding = ({ entityCode }: GetOrgOutstanding) => {
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
	const {
		search, organizationSerialId, pageLimit, page, q, sageId, tradePartySerialId,
	} = outStandingFilters || {};

	const { order, key } = orderBy || {};

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

	const refetch = useCallback((formFilter) => {
		try {
			trigger({
				params: {
					sortBy               : key || undefined,
					sortType             : order || undefined,
					page,
					pageLimit,
					salesAgentId         : formFilter?.salesAgentId || undefined,
					creditControllerId   : formFilter?.creditControllerId || undefined,
					kamId                : formFilter?.kamId || undefined,
					companyType          : formFilter?.companyType || undefined,
					entityCode           : entityCode || undefined,
					organizationSerialId : organizationSerialId || undefined,
					sageId               : sageId || undefined,
					tradePartySerialId   : tradePartySerialId || undefined,
					q                    : q || undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	}, [entityCode, key, order, organizationSerialId, page, pageLimit, q, sageId, tradePartySerialId, trigger]);

	useEffect(() => {
		refetch();
	}, [entityCode, orderBy, organizationSerialId, page,
		pageLimit, sageId, tradePartySerialId, q, key, order, refetch]);

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
		refetch,
	};
};

export default useGetOrgOutstanding;
