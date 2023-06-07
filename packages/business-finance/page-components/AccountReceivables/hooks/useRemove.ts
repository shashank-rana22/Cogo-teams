import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components';

const useRemove = ({ setShow, refetch, id }) => {
	const { trigger, loading } = useRequest('delete', false, 'business_finance', {
		authkey: 'delete_payments_defaulters_by_id',
	})(`/payments/defaulters/delete/${id}`);

	const dataRemove = async () => {
		try {
			const resp = await trigger();
			toast.success(resp?.data?.message || 'Deleted successfully');
			setShow(false);
			refetch?.();
		} catch (err) {
			toast.error(err?.message || 'Failed to remove');
			setShow(false);
		}
	};

	return { dataRemove, loadingOnDelete: loading };
};
export default useRemove;
