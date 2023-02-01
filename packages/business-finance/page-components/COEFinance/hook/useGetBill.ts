import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import useGetFiniteList from './useGetFiniteList';

interface AllParams {
	billId?: number;
	billNumber?: number;
	orgId?: number;
}
interface Profile {
	authorizationparameters?: string;
}
interface UseSelectorProps {
	profile?: Profile;
}
const useGetBill = (allParams = {}) => {
	const { ...params }: AllParams = allParams || {};
	const { authorizationparameters } = useSelector(
		({ profile }: UseSelectorProps) => ({
			authorizationparameters: profile?.authorizationparameters,
		}),
	);
	const [{ loading: apiLoading }, trigger] = useRequestBf(
		{
			url     : `/purchase/bills/${params?.billId}`,
			method  : 'get',
			authKey : 'get_purchase_bills_by_id',
		},
		{ autoCancel: false },
	);
	const [
		{ data: paymentsData, loading: accPaymentLoading },
		accPaymentTrigger,
	] = useRequestBf(
		{
			url     : 'payments/accounts/org-stats',
			method  : 'get',
			authKey : 'get_payments_accounts_org_stats',
		},
		{ autoCancel: false },
	);

	const listApi = async (restFilters: any) => {
		try {
			await trigger({
				params: {
					jobNumber: params?.billNumber,
					...restFilters,
				},
			});
		} catch (err) {
			Toast.error(err);
		}
	};

	useEffect(() => {
		const handleAccPayments = async () => {
			try {
				await accPaymentTrigger({
					params: { orgId: params?.orgId },
				});
			} catch (err) {
				Toast.error(err);
			}
		};
		handleAccPayments();
	}, [accPaymentTrigger, params?.orgId]);
	const { loading, page, filters, list, hookSetters, refetch } = useGetFiniteList(listApi, {
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
