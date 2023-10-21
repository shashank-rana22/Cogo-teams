import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetCallPriority = ({ entityCode = '' }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/outstanding/by-customer-v2',
			method  : 'get',
			authKey : 'get_payments_outstanding_by_customer_v2',
		},
		{ manual: true },
	);

	const refetch = useCallback(() => {
		try {
			trigger({
				params: {
					sortBy     : 'callPriority' || undefined,
					sortType   : 'Desc' || undefined,
					entityCode : entityCode || undefined,
					page       : 1,
					pageLimit  : 1,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	}, [trigger, entityCode]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		callPriorityLoading : loading,
		callPriorityData    : data,
		refetch,
	};
};

export default useGetCallPriority;
