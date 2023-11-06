import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const useGetOrgOutstanding = ({ entityCode = '' }) => {
	const {
		profile: { authorizationparameters, selected_agent_id: selectedAgentId },
	} = useSelector((state) => state);

	const [outStandingFilters, setoutStandingFilters] = useState({
		page      : 1,
		pageLimit : 10,
	});

	const [queryKey, setQueryKey] = useState('q');
	const [orderBy, setOrderBy] = useState({
		key   : 'totalOutstanding',
		order : 'Desc',
		label : 'Total Outstanding Amount',
	});
	const {
		search,
		organizationSerialId,
		pageLimit,
		page,
		q,
		sageId,
		tradePartySerialId,
	} = outStandingFilters || {};

	const { order, key } = orderBy || {};
	const [filters, setFilters] = useState({});
	const {
		salesAgentId = '', portfolioManagerId = '', portfolioManagerRmId = '',
		salesAgentRmId = '', kamId = '', creditControllerId = '', companyType = '', exclude_defaulters = false,
	} = filters || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/outstanding/by-customer-v2',
			method  : 'get',
			authKey : 'get_payments_outstanding_by_customer_v2',
		},
		{ manual: true },
	);

	const { query, debounceQuery } = useDebounceQuery();
	useEffect(() => {
		debounceQuery(search);
	}, [search, debounceQuery]);

	const refetch = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						sortBy       : key || undefined,
						sortType     : order || undefined,
						page,
						pageLimit,
						salesAgentId : salesAgentId || undefined,

						portfolioManagerId: portfolioManagerId || undefined,

						portfolioManagerRmId: portfolioManagerRmId || undefined,

						salesAgentRmId: salesAgentRmId || undefined,

						creditControllerId:

                            creditControllerId || undefined,

						kamId: selectedAgentId || kamId || undefined,

						companyType          : companyType || undefined,
						entityCode           : entityCode || undefined,
						organizationSerialId : organizationSerialId || undefined,
						sageId               : sageId || undefined,
						tradePartySerialId   : tradePartySerialId || undefined,
						q                    : q || undefined,
						excludeDefaulters    : !exclude_defaulters,
					},
				});
			} catch (e) {
				Toast.error(e?.message);
			}
		},
		[trigger, key, order, page, pageLimit,
			salesAgentId, portfolioManagerId, portfolioManagerRmId,
			salesAgentRmId, creditControllerId, selectedAgentId, kamId, companyType,
			entityCode, organizationSerialId, sageId, tradePartySerialId, q, exclude_defaulters],
	);

	useEffect(() => {
		refetch();
	}, [
		entityCode,
		orderBy,
		organizationSerialId,
		page,
		pageLimit,
		sageId,
		tradePartySerialId,
		q,
		key,
		order,
		filters,
		authorizationparameters,
		refetch,
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
		filters,
		setFilters,
		queryKey,
		refetch,
	};
};

export default useGetOrgOutstanding;
