import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../../../commons/toastApiError';

const useGetOrgOutstanding = ({ entityCode = '' }) => {
	const [outStandingFilters, setoutStandingFilters] = useState({
		page      : 1,
		pageLimit : 10,
	});

	const [orderBy, setOrderBy] = useState({
		key   : 'totalOutstandingAmount',
		order : 'Desc',
		label : 'Total Outstanding Amount',
	});
	const {
		search = '', organizationSerialId = '', pageLimit = 10, page = 1, sageId = '', tradePartySerialId = '',
	} = outStandingFilters || {};

	const { order, key } = orderBy || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/outstanding/by-supplier-v2',
			method  : 'get',
			authKey : 'get_payments_outstanding_by_supplier_v2',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery } = useDebounceQuery();
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
					q                    : query || undefined,
				},
			});
		} catch (e) {
			toastApiError(e);
		}
	}, [entityCode, key, order, organizationSerialId, page, pageLimit, query, sageId, tradePartySerialId, trigger]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		outstandingLoading : loading,
		outStandingData    : data,
		setoutStandingFilters,
		outStandingFilters,
		orderBy,
		setOrderBy,
		refetch,
	};
};

export default useGetOrgOutstanding;
