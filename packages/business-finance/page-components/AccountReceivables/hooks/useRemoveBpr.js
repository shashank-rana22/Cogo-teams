import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

const useRemoveBpr = ({ refetch, id }) => {
	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : `/payments/defaulters/delete/${id}`,
			method  : 'delete',
			authKey : 'delete_payments_defaulters_by_id',
		},
		{ manual: true },
	);

	const dataRemove = async () => {
		try {
			const resp = await trigger({ data: {} });
			Toast.success(resp?.data?.message || 'Deleted successfully');
			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Failed to remove');
		}
	};

	return { dataRemove, loadingOnDelete: loading };
};
export default useRemoveBpr;
