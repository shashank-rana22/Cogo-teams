import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';

const useSupplierHistory = () => {
	const { query } = useRouter();
	const { orgId } = query;

	const [{ data:historyData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/supplier-history',
			method  : 'get',
			authKey : 'get_purchase_bills_supplier_history',
		},
		{ autoCancel: false },
	);
	const getSupplierHistory = async () => {
		try {
			await trigger({
				params: {
					id: orgId,
				},
			});
		} catch (err) {
			Toast.error('SUPPLIER HISTORY DOES NOT EXIST');
		}
	};

	return {
		historyData,
		getSupplierHistory,
		loading,
	};
};

export default useSupplierHistory;
