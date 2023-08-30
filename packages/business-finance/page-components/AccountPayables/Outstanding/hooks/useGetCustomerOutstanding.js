import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetCustomerOutstanding = ({ serialId = '', entityCode = '', orgSerialId }) => {
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

	const refetch = useCallback(() => {
		try {
			trigger({
				params: {
					page                 : 1,
					pageLimit            : 10,
					sortBy               : 'totalOutstandingAmount' || undefined,
					sortType             : 'Desc' || undefined,
					entityCode,
					organizationSerialId : orgSerialId,
					tradePartySerialId   : serialId,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	}, [trigger, entityCode, serialId, orgSerialId]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		outstandingLoading : loading,
		outStandingData    : data,
		refetch,
	};
};

export default useGetCustomerOutstanding;
