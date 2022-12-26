import { useEffect } from 'react';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import useGetFiniteList from './useGetFiniteList';


interface AllParams {
    billId?:number
    billNumber?:number
	orgId?:number
}
interface Profile{
    authorizationparameters?:string
}
interface UseSelectorProps{
    profile?:Profile
}

const useGetBill = (allParams = {}) => {
	const { ...params }:AllParams = allParams || {};

	
	const { authorizationparameters } = useSelector(({ profile }:UseSelectorProps) => ({
		authorizationparameters: profile?.authorizationparameters,
	}));

	const [{ data, loading:apiLoading }, trigger] = useRequestBf(
		{
			url     : `/purchase/bills/${params?.billId}`,
			method  : 'get',
			authKey : 'get_purchase_bills_by_id',
		},
		{ autoCancel: false },
	);

    const [{ data:paymentsData, loading:accPaymentLoading, error }, accPaymentTrigger] = useRequestBf(
		{
			url     : 'payments/accounts/org-stats',
			method  : 'get',
			authKey : 'get_payments_accounts_org_stats',
		},
		{ autoCancel: false },
	);


	const listApi = (restFilters:any) => {
		

		return trigger({
			params: {
				jobNumber: params?.billNumber,
				...restFilters,
			},
		});
	};

	const handleAccPayments = async () => {
		try {
			await accPaymentTrigger({
				params: { orgId: params?.orgId },
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		handleAccPayments();
	}, []);

	const {
		loading,
		page,
		filters,
		list,
		hookSetters,
		refetch,
	} = useGetFiniteList(listApi, {
		authorizationparameters,
	});

	return {
		loading: loading || apiLoading,
		page,
		filters,
		list,
        listApi,
		hookSetters,
		refetch,
		accPaymentLoading,
		paymentsData,
	};
};

export default useGetBill;
