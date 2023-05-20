import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

interface AllParams {
	entityCode?: number;
	organizationId?: string;
}

const useGetVendorDetails = (allParams = {}) => {
	const { ...params }: AllParams = allParams || {};

	const [
		{ data: vendorDetailsData, loading: apiLoading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/outstanding/account-payables-for-org',
			method  : 'get',
			authKey : 'get_payments_outstanding_account_payables_for_org',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		const handleAccPayments = async () => {
			try {
				await trigger({
					params: {
						orgId      : params?.organizationId,
						entityCode : params?.entityCode,
					},
				});
			} catch (err) {
				Toast.error(err?.response?.data?.message);
			}
		};
		handleAccPayments();
	}, [trigger, params?.organizationId, params?.entityCode]);

	return {
		apiLoading,
		vendorDetailsData,
	};
};
export default useGetVendorDetails;
