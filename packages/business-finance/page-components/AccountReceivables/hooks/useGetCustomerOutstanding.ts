import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

interface GetOrgOutstanding {
	orgSerialId?: string;
}

const useGetCustomerOutstanding = ({ orgSerialId }: GetOrgOutstanding) => {
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

	const refetch = useCallback(() => {
		try {
			trigger({
				params: {
					organizationSerialId: orgSerialId || undefined,
				},
			});
		} catch (e) {
			Toast.error(e?.message);
		}
	}, [orgSerialId, trigger]);

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
