import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

function useGetActions({ itemData = {} }) {
	const { id = '' } = itemData || {};
	const [{ data, loading }, remarksTrigger] = useRequestBf(
		{
			url     : `/purchase/bills/${id}/remarks`,
			method  : 'get',
			authKey : 'get_purchase_bills_by_id_remarks',
		},
		{ manual: true },
	);

	const fetchRemarkHistory = async () => {
		try {
			await remarksTrigger();
		} catch (e) {
			Toast.error('Oops, Something Went Wrong');
		}
	};
	return {
		remarkLoading : loading,
		fetchRemarkHistory,
		remarkData    : data,
	};
}

export default useGetActions;
