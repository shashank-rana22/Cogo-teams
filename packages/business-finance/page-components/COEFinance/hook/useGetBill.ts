import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface AllParams {
	billId?: number;
	billNumber?: number;
	orgId?: number;
}

const useGetBill = (allParams = {}) => {
	const { ...params }: AllParams = allParams || {};

	const [{ data, loading: apiLoading }, trigger] = useRequestBf(
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
			url     : 'payments/accounts/org-stats-for-coe-finance',
			method  : 'get',
			authKey : 'get_payments_accounts_org_stats_for_coe_finance',
		},
		{ autoCancel: false },
	);

	const listApi = async () => {
		try {
			await trigger({
				params: {
					jobNumber: params?.billNumber,
				},
			});
		} catch (err) {
			Toast.error(err?.response?.data?.message);
		}
	};

	useEffect(() => {
		const handleAccPayments = async () => {
			try {
				await accPaymentTrigger({
					params: { orgId: params?.orgId },
				});
			} catch (err) {
				Toast.error(err?.response?.data?.message);
			}
		};
		handleAccPayments();
	}, [accPaymentTrigger, params?.orgId]);

	return {
		loading : apiLoading,
		data,
		refetch : listApi,
		accPaymentLoading,
		paymentsData,
	};
};
export default useGetBill;
