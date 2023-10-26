import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useUpdateOutstandingList = ({ item = {} }) => {
	const [{ loading }, trigger] = useRequestBf({

		url     : 'payments/outstanding/customer-v2',
		method  : 'put',
		authKey : 'update_payments_outstanding_by_customer_v2',
	}, { manual: true });
	const apiTrigger = async (refetch) => {
		try {
			const resp = await trigger({
				data: {
					entityCode : item?.entityCode,
					orgId      : item?.organizationId,
				},
			});
			Toast.success(resp?.data?.message || 'Updated Successfully');
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Update Failed');
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useUpdateOutstandingList;
