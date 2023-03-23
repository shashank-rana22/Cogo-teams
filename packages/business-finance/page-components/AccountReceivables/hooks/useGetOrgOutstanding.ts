import { Toast } from '@cogoport/components';
import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetOrgOutstanding = ({ formFilters }) => {
	const [outStandingFilters, setoutStandingFilters] = useState({
		page       : 1,
		pageLimit  : 10,
		entityCode : '301',
	});

	const resetQuery = {
		sageId               : undefined,
		q                    : undefined,
		organizationSerialId : undefined,
		tradePartySerialId   : undefined,
	};
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
	}, [search]);

	const refetch = (p) => {
		const { key, order } = orderBy || {};
		try {
			trigger({
				params: {
					...rest,
					...formFilters || undefined,
					sortBy             : orderBy.key,
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
	};

	useEffect(() => {
		refetch();
	}, [
		JSON.stringify(rest),
		JSON.stringify(orderBy),
		JSON.stringify(formFilters),
	]);

	useEffect(() => {
		if (query) {
			setoutStandingFilters({
				...outStandingFilters,
				...resetQuery,
				[queryKey] : query?.toUpperCase() || undefined,
				page       : 1,
			});
		} else {
			setoutStandingFilters({
				...outStandingFilters,
				...resetQuery,
				page: 1,
			});
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
