import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';

const useSupplierHistory = () => {
	const { query } = useRouter();
	const { orgId } = query;

	const [{ data:historyData, loading }, trigger] = useRequest(
		{
			url    : 'get_supplier_shipment_history',
			method : 'get',

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
